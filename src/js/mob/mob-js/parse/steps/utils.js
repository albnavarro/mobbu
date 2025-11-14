import { cleanInMemorySet } from '../../component/in-memory-element-set';
import {
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_KEY,
    ATTR_REPEATER_PROP_BIND,
} from '../../constant';
import { setComponentRepeaterState } from '../../modules/repeater/repeater-value';
import { setSkipAddUserComponent } from '../../modules/user-component';
import {
    ELEMENT_TYPE_MIX_NODE_TEXT,
    ELEMENT_TYPE_NODE,
    EMPTY_NODE,
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
 * @param {Element | DocumentFragment} node
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
            type: EMPTY_NODE,
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
            item: [...childNodes].map((node) => {
                if (node.nodeType === Node.TEXT_NODE)
                    return {
                        node: node?.textContent ?? '',
                        type: ELEMENT_TYPE_TEXT,
                    };

                if (node.nodeType === Node.ELEMENT_NODE)
                    return { node, type: ELEMENT_TYPE_NODE };

                return {
                    item: undefined,
                    type: EMPTY_NODE,
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
        type: EMPTY_NODE,
    };
};

/**
 * Insert DOM inside node by specific type.
 *
 * @param {object} params
 * @param {Element} params.parent
 * @param {import('./type').NodeOrText} params.innerContentByNodeType
 * @param {InsertPosition} params.position
 * @returns {void}
 */
export const insertElementOrText = ({
    parent,
    innerContentByNodeType,
    position = 'afterend',
}) => {
    const { item, type } = innerContentByNodeType;

    if (type === EMPTY_NODE) return;

    /**
     * - Case 1: unNamed slot switch
     * - Case 2: default
     * - In default case use 'afterbegin' toReversed isNeeded
     *
     *   - In questo caso i valori possono essere invertiti
     */
    if (type === ELEMENT_TYPE_MIX_NODE_TEXT) {
        const itemParsed =
            position === 'afterbegin' || position === 'afterend'
                ? // @ts-ignore
                  item.toReversed()
                : item;

        // @ts-ignore
        itemParsed.forEach(({ node, type }) => {
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

/**
 * @param {object} params
 * @param {string} params.stringDOM
 * @param {HTMLElement} params.parent
 * @param {InsertPosition} params.position
 * @returns {void}
 */
export const addDOMfromString = ({ stringDOM, parent, position }) => {
    setSkipAddUserComponent(true);

    const range = document.createRange();
    const fragment = range.createContextualFragment(stringDOM);

    setSkipAddUserComponent(false);
    if (!fragment) return;

    const innerContentByNodeType = getElementOrTextFromNode(fragment);

    insertElementOrText({
        parent,
        innerContentByNodeType,
        position,
    });
};

/**
 * @param {object} params
 * @param {(Element | ChildNode)[]} params.elements
 * @param {HTMLElement} params.parent
 * @param {InsertPosition} params.position
 * @returns {void}
 */
export const addMultipleDOMElement = ({ elements, parent, position }) => {
    const fragment = new DocumentFragment();

    setSkipAddUserComponent(true);
    elements.forEach((element) => {
        if (!element) return;
        fragment.append(element);
    });
    setSkipAddUserComponent(false);

    if (position === 'afterend') parent.after(fragment);
    if (position === 'beforebegin') parent.before(fragment);
    if (position === 'afterbegin') parent.prepend(fragment);
    if (position === 'beforeend') parent.append(fragment);
};
