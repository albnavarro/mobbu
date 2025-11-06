import { cleanInMemorySet } from '../../component/in-memory-element-set';
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

// export const renderHtml = String.raw;

/**
 * Sanitize html string, remove spaces between tag if there is no text and only /n with or without spaces
 *
 * @example
 *     const element = html`
 *         <div>
 *             <span>${value}</span>
 *         </div>
 *     `;
 *
 * @param {TemplateStringsArray} strings
 * @param {...any} values
 * @returns {string}
 */
export const renderHtml = (strings, ...values) => {
    return strings
        .reduce(
            (acc, str, i) =>
                acc + str + (values[i] === undefined ? '' : values[i]),
            ''
        )
        .replaceAll(/>\s+</g, '><')
        .trim();
};

/**
 * Detect if child of element is element / text / mix text and element
 *
 * @param {Element} node
 * @returns {import('./type').NodeOrText}
 */
export const getElementOrTextFromNode = (node) => {
    const childNodes = node.childNodes;
    const firstChildNode = node.firstChild;

    /**
     * No valid node.
     */
    if (childNodes.length === 0 || !firstChildNode) {
        return {
            item: undefined,
            type: ELEMENT_TYPE_NOT_VALID,
        };
    }

    /**
     * First child is a Element node
     */
    if (
        childNodes.length === 1 &&
        firstChildNode.nodeType === Node.ELEMENT_NODE
    ) {
        return {
            item: firstChildNode,
            type: ELEMENT_TYPE_NODE,
        };
    }

    /**
     * First child is a Text node
     */
    if (childNodes.length === 1 && firstChildNode.nodeType === Node.TEXT_NODE) {
        return {
            item: firstChildNode?.textContent ?? '',
            type: ELEMENT_TYPE_TEXT,
        };
    }

    /**
     * Multiple node mix Text && Element node.
     */
    if (childNodes.length > 1) {
        return {
            item: [...childNodes].toReversed().map((node) => {
                if (node.nodeType === Node.TEXT_NODE)
                    return {
                        node: node?.textContent ?? '',
                        type: ELEMENT_TYPE_TEXT,
                    };

                if (node.nodeType === Node.ELEMENT_NODE)
                    return { node, type: ELEMENT_TYPE_NODE };

                return {
                    item: undefined,
                    type: ELEMENT_TYPE_NOT_VALID,
                };
            }),
            type: ELEMENT_TYPE_MIX_NODE_TEXT,
        };
    }

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
 * @param {import('./type').NodeOrText} params.itemObject
 * @param {InsertPosition} params.position
 * @returns {void}
 */
export const insertElementOrText = ({
    parent,
    itemObject,
    position = 'afterend',
}) => {
    const { item, type } = itemObject;

    if (type === ELEMENT_TYPE_NOT_VALID) return;

    if (type === ELEMENT_TYPE_MIX_NODE_TEXT) {
        // @ts-ignore
        item.forEach(({ node, type }) => {
            if (type === ELEMENT_TYPE_NODE) {
                parent.insertAdjacentElement(
                    position,
                    /** @type {HTMLElement} */ (node)
                );
            }

            if (type === ELEMENT_TYPE_TEXT) {
                parent.insertAdjacentText(
                    position,
                    /** @type {string} */ (node)
                );
            }
        });

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

/**
 * With more repeat in same scope, we have multiple render() function nested. The first render() fired is the inneer
 * function ( deepest ). So the other override attributes. Add attributes only if there is no correspondences.
 *
 * @param {object} params
 * @param {import('../../web-component/type').UserComponent[]} params.components
 * @param {Record<string, any>} params.current
 * @param {number} params.index
 * @param {string} params.observe
 * @param {string} params.repeatId
 * @param {string | undefined} params.key
 * @returns {void}
 */
export const setRepeatAttributeFromInMemory = ({
    components,
    current,
    index,
    observe,
    repeatId,
    key,
}) => {
    components.forEach((component) => {
        if (component.hasAttribute(ATTR_CHILD_REPEATID)) {
            cleanInMemorySet(component);
            return;
        }

        component.setAttribute(
            ATTR_CURRENT_LIST_VALUE,
            setComponentRepeaterState({
                current,
                index,
            })
        );
        component.setAttribute(ATTR_KEY, `${key}`);
        component.setAttribute(ATTR_REPEATER_PROP_BIND, `${observe}`);
        component.setAttribute(ATTR_CHILD_REPEATID, `${repeatId}`);
    });
};
