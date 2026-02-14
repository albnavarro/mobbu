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
import { addMultipleDOMElement } from './utils';

/**
 * Render component ( content ) and add to DOM.
 *
 * @param {object} params
 * @param {import('../../web-component/type').UserComponent | HTMLElement} params.element
 * @param {string} params.content
 * @returns {HTMLElement | import('../../web-component/type').UserComponent | undefined}
 */
const getNewElement = ({ element, content }) => {
    const { debug } = getDefaultComponent();

    if (element.parentNode) {
        /**
         * Render content in real DOM element.
         */
        const template = document.createElement('template');
        template.innerHTML = content;
        const node = template.content.firstElementChild;

        /**
         * Disable placeholder status of new node in case new component is a customComponent.
         *
         * - Here custom component is real component not a placeHolder component.
         */

        // @ts-expect-error node can be a user web component.
        node?.disablePlaceHolderState?.();

        /**
         * Add rendered component after placeHolder component.
         */
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
     * Skip if use slotPlaceholder is empty in case no explicit query is used.
     *
     * - If useSlotQuery is true
     * - <mobjs-slot> add to slotPlaceholder it's host element.
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

    /**
     * For each node found.
     */
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
     * - Append render component as sibling of placeholder component.
     * - Element is removed last
     */
    const newElement = getNewElement({ element, content });

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
         * Detect Unnamed slot inside rendered component.
         *
         * Return custom component <mobjs-slot><mobjs-slot>
         */
        const unNamedSlot = useSlotQuery
            ? queryUnNamedSlot(newElement)
            : getUnamedPlaceholderSlot({ element: newElement });

        /**
         * - A) Unnamed slot is found.
         *
         * Replace unnamed slot with userPlaceholder original content ( element.childNodes ).
         *
         * - Example replace <mobjs-slot> with <div>myContent</div>
         * - If content contains a component, will render next cycle.
         *
         * Step:
         *
         * - <mobjs-slot> is inside result of render function.
         *
         *   ```javascrit
         *   return html`
         *       <button type="button" class="c-btn-debug">
         *           <mobjs-slot></mobjs-slot>
         *       </button>
         *   `;
         *   ```
         * - Content inside <debug-button> tag is moved in slot position
         *
         *   ```javascrit
         *   return html`
         *       <debug-button>
         *           <div>my content</div>
         *       </button>
         *   `;
         *   ```
         */
        if (unNamedSlot) {
            addMultipleDOMElement({
                parent: unNamedSlot,
                elements: [...element.childNodes],
                position: 'afterend',
            });

            unNamedSlot.remove();
        }

        /**
         * - B) No unnamed slot is found.
         * - Move original content ( <div>my content</div> ) as firstChild of rendered component.
         * - Similar to unNamed slot but with fixed position limitation ( firstChild ).
         */
        if (!unNamedSlot) {
            addMultipleDOMElement({
                parent: newElement,
                elements: [...element.childNodes],
                position: 'afterbegin',
            });
        }

        /**
         * Move component inside rendered element to related slot with name.
         *
         * - Get all component with slot=<slot-name>
         * - Find slot custom component with related name
         */
        addToNamedSlot({ element: newElement });

        /**
         * CleanUp
         */
        removeOrphanSlot({ element: newElement });

        /**
         * Transfer delegateEventId if exist in placeholder element.
         */
        if (delegateEventId && delegateEventId.length > 0)
            newElement.setAttribute(ATTR_WEAK_BIND_EVENTS, delegateEventId);

        /**
         * Transfer bindRefId if exist in placeholder element.
         */
        if (bindRefId && bindRefId.length > 0)
            newElement.setAttribute(ATTR_BIND_REFS_ID, bindRefId);

        /**
         * Transfer bindRefName if exist in placeholder element.
         */
        if (bindRefName && bindRefName.length > 0)
            newElement.setAttribute(ATTR_BIND_REFS_NAME, bindRefName);

        /**
         * Add data-mobjs="id" in debug mode.
         */
        const { debug } = getDefaultComponent();
        if (debug) newElement.setAttribute(ATTR_IS_COMPONENT, id ?? '');
    }

    /**
     * Finally delete placeholder component.
     */
    element.remove();

    return newElement;
};

/**
 * Render component.
 *
 * @param {object} obj
 * @param {HTMLElement | import('../../web-component/type').UserComponent} obj.element - Current placeholder component.
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
