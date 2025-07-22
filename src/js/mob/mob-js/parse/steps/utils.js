import {
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_KEY,
    ATTR_REPEATER_PROP_BIND,
} from '../../constant';
import { setComponentRepeaterState } from '../../modules/repeater/repeater-value';
import {
    ELEMENT_TYPE_MIX_NODE_TEXT,
    ELEMENT_TYPE_NODE,
    ELEMENT_TYPE_NOT_VALID,
    ELEMENT_TYPE_TEXT,
} from './constant';

export const renderHtml = String.raw;

/**
 * Detect if child of element is element / text / mix text and element
 *
 * @param {Element} node
 * @returns {{ item: Element | string | undefined; type: string }}
 */
export const getElementOrTextFromNode = (node) => {
    const childNodes = node.childNodes;

    /**
     * No content
     */
    if (childNodes.length === 0) {
        return {
            item: undefined,
            type: ELEMENT_TYPE_NOT_VALID,
        };
    }

    const children = node.children;

    /**
     * Is a unique node.
     */
    if (children.length === 1 && childNodes.length === 1) {
        return {
            item: node.children?.[0],
            type: ELEMENT_TYPE_NODE,
        };
    }

    /**
     * Can be everything.
     */
    if (childNodes.length > 1)
        return {
            item: node.innerHTML,
            type: ELEMENT_TYPE_MIX_NODE_TEXT,
        };

    /**
     * Is a textNode
     */
    const textContent = node.textContent;
    if (textContent && textContent.length > 0)
        return {
            item: textContent,
            type: ELEMENT_TYPE_TEXT,
        };

    /**
     * Fallback
     */
    return {
        item: undefined,
        type: ELEMENT_TYPE_NOT_VALID,
    };
};

/**
 * Insert DOM inside node by specific type.
 *
 * @param {object} params
 * @param {Element} params.parent
 * @param {{ item: Element | string | undefined; type: string }} params.itemObject
 * @param {InsertPosition} params.position
 * @returns {void}
 */
export const insertElementOrText = ({
    parent,
    itemObject,
    position = 'afterend',
}) => {
    const { item, type } = itemObject;

    if (type === ELEMENT_TYPE_MIX_NODE_TEXT) {
        parent.insertAdjacentHTML(position, /** @type {string} */ (item));
        return;
    }

    if (type === ELEMENT_TYPE_NODE) {
        parent.insertAdjacentElement(position, /** @type {Element} */ (item));
        return;
    }

    if (type === ELEMENT_TYPE_TEXT) {
        parent.insertAdjacentText(position, /** @type {string} */ (item));
        return;
    }

    return;
};

/**
 * With more repeat in same scope, we have multiple render() function nested. The first render() fired is the inneer
 * function ( deepest ). So the other override attributes. Add attributes only if there is no correspondences.
 *
 * @param {object} params
 * @param {WeakRef<import('../../web-component/type').UserComponent>[]} params.components
 * @param {Record<string, any>} params.current
 * @param {number} params.index
 * @param {string} params.observe
 * @param {string} params.repeatId
 * @param {string | undefined} params.key
 * @returns {void}
 */
export const setRepeatAttribute = ({
    components,
    current,
    index,
    observe,
    repeatId,
    key,
}) => {
    components.forEach((component) => {
        if (!component.deref()?.hasAttribute(ATTR_CURRENT_LIST_VALUE)) {
            component.deref()?.setAttribute(
                ATTR_CURRENT_LIST_VALUE,
                setComponentRepeaterState({
                    current,
                    index,
                })
            );
        }

        if (!component.deref()?.hasAttribute(ATTR_KEY)) {
            component.deref()?.setAttribute(ATTR_KEY, `${key}`);
        }

        if (!component.deref()?.hasAttribute(ATTR_REPEATER_PROP_BIND)) {
            component
                .deref()
                ?.setAttribute(ATTR_REPEATER_PROP_BIND, `${observe}`);
        }

        if (!component.deref()?.hasAttribute(ATTR_CHILD_REPEATID)) {
            component.deref()?.setAttribute(ATTR_CHILD_REPEATID, `${repeatId}`);
        }
    });
};
