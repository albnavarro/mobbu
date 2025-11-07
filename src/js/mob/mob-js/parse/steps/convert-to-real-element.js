import {
    ATTR_BIND_REFS_ID,
    ATTR_BIND_REFS_NAME,
    ATTR_IS_COMPONENT,
    ATTR_WEAK_BIND_EVENTS,
} from '../../constant';
import { getDefaultComponent } from '../../component/create-component';
import { queryComponentUseSlot } from '../../query/query-component-use-slot';
import { queryGenericSlot } from '../../query/query-generic-slot';
import { querySecificSlot } from '../../query/query-specific-slot';
import { queryUnNamedSlot } from '../../query/query-unnamed-slot';
import { useSlotQuery, useComponentHasNamedSlotQuery } from '../strategy';
import { getAllUserComponentUseNamedSlot } from '../../modules/user-component';
import {
    getAllSlot,
    getSlotByName,
    getSlotPlaceholderSize,
    getUnamedPlaceholderSlot,
} from '../../modules/slot';
import { getElementOrTextFromNode, insertElementOrText } from './utils';

/**
 * Get new element from content ( render ). Prevent accidentally return of element or component deleted runtime. Check
 * parentNode to insertAdjacentHTML possible error.
 *
 * @param {object} obj
 * @param {import('../../web-component/type').UserComponent | HTMLElement} obj.element
 * @param {string} obj.content
 * @returns {HTMLElement | import('../../web-component/type').UserComponent | undefined}
 */
const getNewElement = ({ element, content }) => {
    const { debug } = getDefaultComponent();

    if (element.parentNode) {
        // element.insertAdjacentHTML('afterend', content);
        // const node = element.nextElementSibling;

        // const node = document
        //     .createRange()
        //     .createContextualFragment(content).firstElementChild;

        // const parser = new DOMParser();
        // const doc = parser.parseFromString(content, 'text/html');
        // const node = doc.body.firstElementChild;

        const template = document.createElement('template');
        template.innerHTML = content;
        const node = template.content.firstElementChild;

        /**
         * Disable placeholder before add to DOM Avoid add component to userPlaceholder map.
         */

        // @ts-expect-error node can be a user web component.
        node?.disablePlaceHolderState?.();

        if (node) element.after(node);

        /**
         * Add component name in debug mode
         */
        if (debug)
            element.insertAdjacentHTML(
                'afterend',
                `<!--  ${element.tagName.toLowerCase()} --> `
            );

        return /** @type {HTMLElement} */ (node);
    }

    return;
};

/**
 * Remove unused slot placehodler. ( no element have sustitute slot ) If slot is not used remove id reference orphans
 * from store.
 *
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * @returns {void}
 */
const removeOrphanSlot = ({ element }) => {
    const slots = useSlotQuery ? queryGenericSlot(element) : getAllSlot();

    slots.forEach((slot) => {
        slot?.removeCustomComponent();
        slot?.remove();
    });
};

/**
 * Move child element of new component to related slot with name.
 *
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * @returns {void}
 */
const addToNamedSlot = ({ element }) => {
    /**
     * Skip if use Slot Set database instead do query. Id database is empty return; there two strategy:
     *
     * - UseSlotQuery
     * - UseComponentHasNamedSlotQuery
     *
     * SlotPlaceholder is filled if useSlotQuery is false.
     *
     * - UseComponentHasNamedSlotQuery is specific strategy for named slot.
     */
    if (!useSlotQuery && getSlotPlaceholderSize() === 0) return;

    /**
     * First: find all node with slot=<slot-name> defined.
     *
     * - By default use query from root node
     */
    const componentWithSlot = useComponentHasNamedSlotQuery
        ? queryComponentUseSlot(element)
        : getAllUserComponentUseNamedSlot({ element });

    if (componentWithSlot.length === 0) return;

    [...componentWithSlot].forEach((component) => {
        // @ts-ignore - Get slot name
        const slotName = component?.getSlotPosition();

        /**
         * Find slot used by component.
         */
        const slot = useSlotQuery
            ? querySecificSlot(element, slotName)
            : getSlotByName({ name: slotName, element });

        /**
         * Add component/element before slot and remove slot
         */
        if (slot) {
            slot.parentNode?.insertBefore(component, slot);
            slot?.removeCustomComponent();
            slot?.remove();
        }
    });
};

/**
 * @param {object} obj
 * @param {import('../../web-component/type').UserComponent | HTMLElement} obj.element - Current user component.
 * @param {string} obj.content - The return DOM from component function.
 * @returns {HTMLElement | import('../../web-component/type').UserComponent | undefined}
 */
const executeConversion = ({ element, content }) => {
    /**
     * - Get inner DOM of component to parse.
     * - Detect if is TEXT / NODE or mix of TEXT and NODE.
     * - Mix: Multiple node, should be ELEMENT_NODE or TEXT_NODE
     * - Element: there is only one child and is a ELEMENT_NODE
     * - Text: there is only one child and is a TEXT_NODE
     *
     * Is used to choice for `insertElementOrText` or `insertAdjacentElement`
     *
     * Es:
     *
     *     <doc-container>
     *         #shadow-root
     *         <div>
     *             <my-component></my-component>
     *         </div>
     *     </doc-container>;
     *
     * Return object like:
     *
     * ```js
     * {
     *     item: Element | string | undefined;
     *     type: node|mix|text|not-valid;
     * }
     * ```
     */
    const innerContentByNodeType = getElementOrTextFromNode(element);

    /**
     * - Append render component as sibling of placeholder component.
     * - Element is removed last
     */
    const newElement = getNewElement({ element, content });

    /**
     * Get inner content and copy data from provvisory component
     */
    if (newElement) {
        // @ts-ignore
        const id = element.getId();

        // @ts-ignore
        const delegateEventId = element?.getDelegateEventId();

        // @ts-ignore
        const bindRefId = element?.getBindRefId();

        // @ts-ignore
        const bindRefName = element?.getBindRefName();

        /**
         * Detect Unnamed slot
         */
        const unNamedSlot = useSlotQuery
            ? queryUnNamedSlot(newElement)
            : getUnamedPlaceholderSlot({ element: newElement });

        /**
         * Replace unnamed slot with userPlaceholder orinal content.
         */
        if (unNamedSlot) {
            insertElementOrText({
                parent: unNamedSlot,
                innerContentByNodeType,
                position: 'afterend',
            });

            unNamedSlot.remove();
        }

        /**
         * Add original userPlaceholder content as first-child of new component.
         */
        if (!unNamedSlot) {
            insertElementOrText({
                parent: newElement,
                innerContentByNodeType,
                position: 'afterbegin',
            });
        }

        addToNamedSlot({ element: newElement });
        removeOrphanSlot({ element: newElement });

        /**
         * Transfer delegateEventId if exist in placeholder element.
         */
        if (delegateEventId && delegateEventId.length > 0)
            newElement.setAttribute(ATTR_WEAK_BIND_EVENTS, delegateEventId);

        if (bindRefId && bindRefId.length > 0)
            newElement.setAttribute(ATTR_BIND_REFS_ID, bindRefId);

        if (bindRefName && bindRefName.length > 0)
            newElement.setAttribute(ATTR_BIND_REFS_NAME, bindRefName);

        /**
         * Add data-mobjs="id" in debug mode.
         */
        const { debug } = getDefaultComponent();
        if (debug) newElement.setAttribute(ATTR_IS_COMPONENT, id ?? '');
    }

    /**
     * Delete provvisory component and add real component.
     */
    element.remove();

    return newElement;
};

/**
 * Add content to component
 *
 * @param {object} obj
 * @param {HTMLElement | import('../../web-component/type').UserComponent} obj.element - Current user component.
 * @param {string} obj.content - The return DOM from component function.
 * @returns {{ newElement: HTMLElement | import('../../web-component/type').UserComponent | undefined }
 *     | { newElement: HTMLElement | undefined }}
 */
export const convertToRealElement = ({ element, content }) => {
    return {
        newElement: executeConversion({
            element,
            content,
        }),
    };
};
