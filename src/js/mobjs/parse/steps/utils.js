// @ts-check

import {
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_KEY,
    ATTR_REPEATER_PROP_BIND,
} from '../../constant';
import { setComponentRepeaterState } from '../../modules/repeater/repeaterValue';
import {
    ELEMENT_TYPE_MIX_NODE_TEXT,
    ELEMENT_TYPE_NODE,
    ELEMENT_TYPE_NOT_VALID,
    ELEMENT_TYPE_TEXT,
} from './constant';

/**
 * @param {object} obj
 * @param {{bind:Array<string>, props: Function}|undefined} obj.dynamicProps
 * @param {string|undefined} obj.stateToWatch
 * @returns {{bind:Array<string>, props: function}|undefined}
 *
 * @description
 * Remove watch state from bind.
 */
export const removeWatchFromDynamicProps = ({ dynamicProps, stateToWatch }) => {
    if (!dynamicProps || !('bind' in dynamicProps) || !stateToWatch)
        return dynamicProps;

    const { bind } = dynamicProps;
    const newBind = bind.filter(
        (/** @type{string} */ state) => state !== stateToWatch
    );

    return { ...dynamicProps, bind: newBind };
};

export const renderHtml = String.raw;

/**
 * @description
 * Detect if child of element is element / text / mix text and element
 *
 * @param {Element} node
 * @returns {{item: Element|string, type: string}}
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
 * @description
 * Insert DOM inside node by specific type.
 *
 * @param {object} params
 * @param {Element} params.parent
 * @param {{item: Element|string, type: string}} params.itemObject
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
        parent.insertAdjacentHTML(position, /** @type{string} */ (item));
        return;
    }

    if (type === ELEMENT_TYPE_NODE) {
        parent.insertAdjacentElement(position, /** @type{Element} */ (item));
        return;
    }

    if (type === ELEMENT_TYPE_TEXT) {
        parent.insertAdjacentText(position, /** @type{string} */ (item));
        return;
    }

    return;
};

/**
 * @param {object} params
 * @param {import('../../webComponent/type').UserComponent[]} params.components
 * @param {Record<string, any>} params.current
 * @param {number} params.index
 * @param {string} params.bind
 * @param {string} params.repeatId
 * @param {string} params.key
 * @returns {void}
 *
 */
export const setRepeatAttribute = ({
    components,
    current,
    index,
    bind,
    repeatId,
    key,
}) => {
    components.forEach((component) => {
        if (!component.hasAttribute(ATTR_CURRENT_LIST_VALUE)) {
            component.setAttribute(
                ATTR_CURRENT_LIST_VALUE,
                setComponentRepeaterState({
                    current,
                    index,
                })
            );
        }

        if (!component.hasAttribute(ATTR_KEY)) {
            component.setAttribute(ATTR_KEY, `${key}`);
        }

        if (!component.hasAttribute(ATTR_REPEATER_PROP_BIND)) {
            component.setAttribute(ATTR_REPEATER_PROP_BIND, `${bind}`);
        }

        if (!component.hasAttribute(ATTR_CHILD_REPEATID)) {
            component.setAttribute(ATTR_CHILD_REPEATID, `${repeatId}`);
        }
    });
};

/**
 * @param {DocumentFragment} fragment
 * @returns {string}
 */
export const serializeFragment = (fragment) => {
    const serializer = new XMLSerializer();
    const xmlnAttribute = ' xmlns="http://www.w3.org/1999/xhtml"';
    const rawString = serializer.serializeToString(fragment);
    const regEx = new RegExp(xmlnAttribute, 'g');
    return rawString.replaceAll(regEx, '');
};
