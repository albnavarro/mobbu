// @ts-check

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
 * @param {Element} node
 * @returns {{item: Element|string, type: string}}
 */
export const getElementOrTextFromNode = (node) => {
    const children = node.childNodes;

    if (children.length > 1)
        return {
            item: node.innerHTML,
            type: ELEMENT_TYPE_MIX_NODE_TEXT,
        };

    /**
     * Second chance detect if first node is a text
     */
    const textContent = node.textContent;
    if (textContent.length > 0)
        return {
            item: textContent,
            type: ELEMENT_TYPE_TEXT,
        };

    /**
     * No content inside component
     */
    return {
        item: undefined,
        type: ELEMENT_TYPE_NOT_VALID,
    };
};

/**
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
