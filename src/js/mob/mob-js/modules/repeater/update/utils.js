import {
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_KEY,
    ATTR_REPEATER_PROP_BIND,
} from '../../../constant';
import { setRepeatAttribute } from '../../../parse/steps/utils';
import { queryAllFutureComponent } from '../../../query/query-all-future-component';
import { setSkipAddUserComponent } from '../../user-component';
import { setComponentRepeaterState } from '../repeater-value';
import { getRepeatProxi } from './get-proxi';

/**
 * @param {object} params
 * @param {string} params.id
 * @param {number} params.diff
 * @param {any} params.current
 * @param {number} params.previousLenght
 * @param {string} params.state
 * @param {string} params.repeatId
 * @param {import('../type').RepeaterRender} params.render
 * @returns {Element[]}
 */
export const updateRepeaterWitoutKey = ({
    id,
    diff,
    current,
    previousLenght,
    render,
    state,
    repeatId,
}) => {
    setSkipAddUserComponent(true);
    const range = document.createRange();

    /**
     * Create palcehodler component
     */
    const renderedDOM = [...Array.from({ length: diff }).keys()].map(
        (_item, index) => {
            const initialValue = current?.[index + previousLenght];
            const initialIndex = index + previousLenght;

            const proxiObject = getRepeatProxi({
                id,
                observe: state,
                hasKey: false,
                index: initialIndex,
            });

            const rawRender = render({
                initialIndex,
                initialValue,
                current: proxiObject,
                sync: () => '',
            });

            const fragment = range.createContextualFragment(rawRender);

            const components = queryAllFutureComponent(fragment, false).map(
                (element) => {
                    return new WeakRef(element);
                }
            );

            setRepeatAttribute({
                components,
                current: initialValue,
                index: initialIndex,
                observe: state,
                repeatId,
                key: undefined,
            });

            /**
             * Remove fragment as soon as possible from GC. TODO Is really necessary ?
             */
            return fragment.firstElementChild;
        }
    );

    setSkipAddUserComponent(false);

    return renderedDOM.filter((element) => element !== null);
};

/**
 * @param {object} params
 * @param {number} params.initialIndex
 * @param {any} params.initialValue
 * @param {string} params.state
 * @param {string} params.repeatId
 * @returns {string}
 */
const getSyncWithoutKey = ({ initialIndex, initialValue, state, repeatId }) => {
    return /* HTML */ `${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState({
        current: initialValue,
        index: initialIndex,
    })}"
    ${ATTR_REPEATER_PROP_BIND}="${state}" ${ATTR_CHILD_REPEATID}="${repeatId}"`;
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {number} params.diff
 * @param {any} params.current
 * @param {number} params.previousLenght
 * @param {string} params.state
 * @param {string} params.repeatId
 * @param {import('../type').RepeaterRender} params.render
 * @returns {string}
 */
export const updateRepeaterWithoutKeyUseSync = ({
    id,
    diff,
    previousLenght,
    current,
    state,
    repeatId,
    render,
}) => {
    return [...Array.from({ length: diff }).keys()]
        .map((_item, index) => {
            const initialIndex = index + previousLenght;

            // use a copy to avoid problem in closure below.
            const initialValue = current?.[initialIndex]
                ? { ...current?.[initialIndex] }
                : {};

            const proxiObject = getRepeatProxi({
                id,
                observe: state,
                hasKey: false,
                index: initialIndex,
            });

            return render({
                sync: () =>
                    getSyncWithoutKey({
                        initialIndex,
                        initialValue,
                        repeatId,
                        state,
                    }),
                initialIndex,
                initialValue,
                current: proxiObject,
            });
        })
        .join('');
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {Record<string, any>} params.currentValue
 * @param {number} params.index
 * @param {string} params.state
 * @param {string} params.repeatId
 * @param {any} params.keyValue
 * @param {string | undefined} params.key
 * @param {import('../type').RepeaterRender} params.render
 * @returns {Element | null}
 */
export const updateRepeaterWithtKey = ({
    id,
    currentValue,
    index,
    state,
    repeatId,
    key,
    keyValue,
    render,
}) => {
    setSkipAddUserComponent(true);

    const proxiObject = getRepeatProxi({
        id,
        observe: state,
        hasKey: true,
        key,
        keyValue,
        index,
    });

    const fragment = document.createRange().createContextualFragment(
        render({
            initialIndex: index,
            initialValue: currentValue,
            current: proxiObject,
            sync: () => '',
        })
    );

    const components = queryAllFutureComponent(fragment, false).map(
        (element) => {
            return new WeakRef(element);
        }
    );

    setRepeatAttribute({
        components,
        current: currentValue,
        index,
        observe: state,
        repeatId,
        key: keyValue,
    });

    setSkipAddUserComponent(false);

    /**
     * Remove fragment as soon as possible from GC. TODO Is really necessary ?
     */
    return fragment.firstElementChild;
};

/**
 * @param {object} params
 * @param {string} params.keyValue
 * @param {number} params.index
 * @param {any} params.currentValue
 * @param {string} params.state
 * @param {string} params.repeatId
 * @returns {string}
 */
const getSyncWithKey = ({ keyValue, index, currentValue, state, repeatId }) => {
    return /* HTML */ ` ${ATTR_KEY}="${keyValue}"
    ${ATTR_REPEATER_PROP_BIND}="${state}"
    ${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState({
        current: currentValue,
        index,
    })}"
    ${ATTR_CHILD_REPEATID}="${repeatId}"`;
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {Record<string, any>} params.currentValue
 * @param {number} params.index
 * @param {string} params.state
 * @param {string} params.repeatId
 * @param {string | undefined} params.key
 * @param {any} params.keyValue
 * @param {import('../type').RepeaterRender} params.render
 * @returns {string}
 */
export const updateRepeaterWithtKeyUseSync = ({
    id,
    currentValue,
    index,
    state,
    repeatId,
    key,
    keyValue,
    render,
}) => {
    // use a copy to avoid problem in closure below.
    const currentValueCopy = { ...currentValue };

    const proxiObject = getRepeatProxi({
        id,
        observe: state,
        hasKey: true,
        key,
        keyValue,
        index,
    });

    return render({
        initialIndex: index,
        initialValue: currentValueCopy,
        current: proxiObject,
        sync: () =>
            getSyncWithKey({
                currentValue: currentValueCopy,
                index,
                keyValue,
                repeatId,
                state,
            }),
    });
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {Record<string, any>[]} params.currentUnique
 * @param {import('../type').RepeaterRender} params.render
 * @param {string} params.observe
 * @param {string} params.repeatId
 * @param {string | undefined} params.key
 * @param {boolean} params.hasKey
 * @returns {Element[]}
 */
export const getRenderWithoutSync = ({
    id,
    currentUnique,
    render,
    observe,
    repeatId,
    key = '',
    hasKey,
}) => {
    setSkipAddUserComponent(true);
    const range = document.createRange();

    /**
     * Render immediately first DOM
     */
    const renderedDOM = currentUnique.map((item, index) => {
        const proxiObject = getRepeatProxi({
            id,
            observe,
            hasKey,
            key,
            keyValue: hasKey ? item?.[key] : '',
            index,
        });

        const fragment = range.createContextualFragment(
            render({
                initialIndex: index,
                initialValue: item,
                current: proxiObject,
                sync: () => '',
            })
        );

        const components = queryAllFutureComponent(fragment, false).map(
            (element) => {
                return new WeakRef(element);
            }
        );

        setRepeatAttribute({
            components,
            current: item,
            index,
            observe,
            repeatId,
            key: hasKey ? item?.[key] : '',
        });

        /**
         * Remove fragment as soon as possible from GC. TODO Is really necessary ?
         */
        return fragment.firstElementChild;
    });

    setSkipAddUserComponent(false);

    return renderedDOM.filter((element) => element !== null);
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {Record<string, any>[]} params.currentUnique
 * @param {import('../type').RepeaterRender} params.render
 * @param {string} params.observe
 * @param {string} params.repeatId
 * @param {string} params.key
 * @param {boolean} params.hasKey
 * @returns {string}
 */
export const getRenderWithSync = ({
    id,
    currentUnique,
    key = '',
    observe,
    repeatId,
    hasKey,
    render,
}) => {
    const rawRender = () => {
        return currentUnique
            .map((item, index) => {
                const sync =
                    /* HTML */ () => `${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState(
                        {
                            current: item,
                            index: index,
                        }
                    )}"
                            ${ATTR_KEY}="${hasKey ? item?.[key] : ''}"
                            ${ATTR_REPEATER_PROP_BIND}="${observe}"
                            ${ATTR_CHILD_REPEATID}="${repeatId}"`;

                const proxiObject = getRepeatProxi({
                    id,
                    observe,
                    hasKey,
                    key,
                    keyValue: hasKey ? item?.[key] : '',
                    index,
                });

                return render({
                    sync,
                    initialIndex: index,
                    initialValue: item,
                    current: proxiObject,
                });
            })
            .join('');
    };

    return rawRender();
};
