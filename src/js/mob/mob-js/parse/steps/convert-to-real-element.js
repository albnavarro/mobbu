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
import { removeCurrentToBindPropsByPropsId } from '../../modules/bind-props';
import { removeCurrentToPropsByPropsId } from '../../modules/static-props';
import { forceComponentChildQuery, useSlotQuery, useQuery } from '../use-query';
import { getAllUserComponentUseNamedSlot } from '../../modules/user-component';
import {
    getAllSlot,
    getSlotByName,
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
        const dynamicPropsIdFromSlot = slot.getDynamicProps();
        if (dynamicPropsIdFromSlot && dynamicPropsIdFromSlot !== '') {
            removeCurrentToBindPropsByPropsId({
                propsId: dynamicPropsIdFromSlot,
            });
        }

        /**
         * If slot is not used remove id reference orphans from store.
         */
        const staticPropsIdFromSlot = slot.getStaticProps();
        if (staticPropsIdFromSlot && staticPropsIdFromSlot !== '') {
            removeCurrentToPropsByPropsId({ propsId: staticPropsIdFromSlot });
        }

        slot?.removeCustomComponent();
        slot?.remove();
    });
};

/**
 * Move element to related slot if defined. And delete original slot placehodler
 *
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * @returns {void}
 */
const addToNamedSlot = ({ element }) => {
    const componentWithSlot =
        useQuery || forceComponentChildQuery
            ? queryComponentUseSlot(element)
            : getAllUserComponentUseNamedSlot({ element });

    if (componentWithSlot.length === 0) return;

    const slots = [...componentWithSlot].map((component) => {
        // @ts-ignore
        const slotName = component?.getSlotPosition();

        /**
         * Find slot used by component.
         */
        const slot = useSlotQuery
            ? querySecificSlot(element, slotName)
            : getSlotByName({ name: slotName, element });

        /**
         * If no slot return;
         */
        if (!slot) return { slot: null, elementMoved: null };

        /**
         * Add component/element before slot.
         */
        slot.parentNode?.insertBefore(component, slot);
        const elementMoved = /** @type {HTMLElement} */ (slot.previousSibling);

        return { slot, elementMoved };
    });

    /**
     * Delete slot.
     */
    slots.forEach(({ slot, elementMoved }) => {
        if (!slot) return;

        /**
         * Set props id from slot to component.
         *
         * @type {string | undefined}
         */
        // @ts-ignore
        const propsIdFromSlot = slot.getStaticProps();
        if (propsIdFromSlot)
            // @ts-ignore
            elementMoved?.setPropsFromSlotId?.(propsIdFromSlot);

        // @ts-ignore
        const bindPropsIdFromSlot = slot.getDynamicProps();
        if (bindPropsIdFromSlot)
            // @ts-ignore
            elementMoved?.setDynamicPropsFromSlotId?.(bindPropsIdFromSlot);

        slot?.removeCustomComponent();
        slot?.remove();
    });
};

/**
 * @param {object} obj
 * @param {import('../../web-component/type').UserComponent | HTMLElement} obj.element
 * @param {string} obj.content
 * @returns {HTMLElement | import('../../web-component/type').UserComponent | undefined}
 */
const executeConversion = ({ element, content }) => {
    /**
     * Add real content from render function
     */
    // const prevContent2 = element.innerHTML;
    const prevContent = getElementOrTextFromNode(element);
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
         * If unNamedSlot is used. Replace un-named slot with previous content.
         */
        const unNamedSlot = useSlotQuery
            ? queryUnNamedSlot(newElement)
            : getUnamedPlaceholderSlot({ element: newElement });

        // if (unNamedSlot && prevContent.length > 0) {
        //     unNamedSlot.insertAdjacentHTML('afterend', prevContent);
        //     unNamedSlot.remove();
        // }
        //
        // if (!unNamedSlot && prevContent.length > 0) {
        //     newElement.insertAdjacentHTML('afterbegin', prevContent);
        // }

        if (unNamedSlot) {
            insertElementOrText({
                parent: unNamedSlot,
                itemObject: prevContent,
                position: 'afterend',
            });

            unNamedSlot.remove();
        }

        if (!unNamedSlot) {
            insertElementOrText({
                parent: newElement,
                itemObject: prevContent,
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
 * @param {HTMLElement | import('../../web-component/type').UserComponent} obj.element
 * @param {string} obj.content
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
