import {
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
    ATTR_KEY,
    ATTR_REPEATER_PROP_BIND,
} from '../../../constant';
import {
    renderHtml,
    serializeFragment,
    setRepeatAttribute,
} from '../../../parse/steps/utils';
import { queryAllFutureComponent } from '../../../query/queryAllFutureComponent';
import { setSkipAddUserComponent } from '../../userComponent';
import { setComponentRepeaterState } from '../repeaterValue';
import { getRepeatProxi } from './getProxi';

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

    /**
     * Create palcehodler component
     */
    const serializedFragment = [...new Array(diff).keys()]
        .map((_item, index) => {
            const initialValue = current?.[index + previousLenght];
            const initialIndex = index + previousLenght;

            const proxiObject = getRepeatProxi({
                id,
                bind: state,
                hasKey: false,
                index: initialIndex,
            });

            const rawRender = render({
                initialIndex,
                initialValue,
                current: proxiObject,
                html: renderHtml,
                sync: () => '',
            });

            let fragment = document
                .createRange()
                .createContextualFragment(rawRender);

            const components = queryAllFutureComponent(fragment, false);

            setRepeatAttribute({
                components,
                current: initialValue,
                index: initialIndex,
                bind: state,
                repeatId,
                key: undefined,
            });

            const serializedRender = serializeFragment(fragment);

            /**
             * Remove fragment as soon as possible from GC.
             * TODO Is really necessary ?
             */
            // @ts-ignore
            fragment = null;
            return serializedRender;
        })
        .join('');

    setSkipAddUserComponent(false);

    return serializedFragment;
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
    return [...new Array(diff).keys()]
        .map((_item, index) => {
            const initialValue = current?.[index + previousLenght];
            const initialIndex = index + previousLenght;

            const sync =
                /* HTML */ () => `${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState(
                    {
                        current: initialValue,
                        index: initialIndex,
                    }
                )}"
            ${ATTR_REPEATER_PROP_BIND}="${state}"
            ${ATTR_CHILD_REPEATID}="${repeatId}"`;

            const proxiObject = getRepeatProxi({
                id,
                bind: state,
                hasKey: false,
                index: initialIndex,
            });

            return render({
                sync,
                initialIndex,
                initialValue,
                current: proxiObject,
                html: renderHtml,
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
 * @param {string|undefined} params.key
 * @param {import('../type').RepeaterRender} params.render
 * @returns {string}
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
        bind: state,
        hasKey: true,
        key,
        keyValue,
        index,
    });

    let fragment = document.createRange().createContextualFragment(
        render({
            initialIndex: index,
            initialValue: currentValue,
            current: proxiObject,
            html: renderHtml,
            sync: () => '',
        })
    );
    const components = queryAllFutureComponent(fragment, false);

    setRepeatAttribute({
        components,
        current: currentValue,
        index,
        bind: state,
        repeatId,
        key: keyValue,
    });

    setSkipAddUserComponent(false);

    const serializedRender = serializeFragment(fragment);

    /**
     * Remove fragment as soon as possible from GC.
     * TODO Is really necessary ?
     */
    // @ts-ignore
    fragment = null;
    return serializedRender;
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {Record<string, any>} params.currentValue
 * @param {number} params.index
 * @param {string} params.state
 * @param {string} params.repeatId
 * @param {string|undefined} params.key
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
    const proxiObject = getRepeatProxi({
        id,
        bind: state,
        hasKey: true,
        key,
        keyValue,
        index,
    });

    const sync = () =>
        /* HTML */ ` ${ATTR_KEY}="${keyValue}"
        ${ATTR_REPEATER_PROP_BIND}="${state}"
        ${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState({
            current: currentValue,
            index,
        })}"
        ${ATTR_CHILD_REPEATID}="${repeatId}"`;

    return render({
        initialIndex: index,
        initialValue: currentValue,
        current: proxiObject,
        html: renderHtml,
        sync,
    });
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {Record<string, any>[]} params.currentUnique
 * @param {import('../type').RepeaterRender} params.render
 * @param {string} params.bind
 * @param {string} params.repeatId
 * @param {string|undefined} params.key
 * @param {boolean} params.hasKey
 * @returns {string}
 */
export const getRenderWithoutSync = ({
    id,
    currentUnique,
    render,
    bind,
    repeatId,
    key = '',
    hasKey,
}) => {
    setSkipAddUserComponent(true);

    /**
     * Render immediately first DOM
     */
    const rawRender = currentUnique
        .map((item, index) => {
            const proxiObject = getRepeatProxi({
                id,
                bind,
                hasKey,
                key,
                keyValue: hasKey ? item?.[key] : '',
                index,
            });

            let fragment = document.createRange().createContextualFragment(
                render({
                    initialIndex: index,
                    initialValue: item,
                    current: proxiObject,
                    html: renderHtml,
                    sync: () => '',
                })
            );

            const components = queryAllFutureComponent(fragment, false);

            setRepeatAttribute({
                components,
                current: item,
                index,
                bind,
                repeatId,
                key: hasKey ? item?.[key] : '',
            });

            const serializedRender = serializeFragment(fragment);

            /**
             * Remove fragment as soon as possible from GC.
             * TODO Is really necessary ?
             */
            // @ts-ignore
            fragment = null;
            return serializedRender;
        })
        .join('');

    setSkipAddUserComponent(false);

    return rawRender;
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {Record<string, any>[]} params.currentUnique
 * @param {import('../type').RepeaterRender} params.render
 * @param {string} params.bind
 * @param {string} params.repeatId
 * @param {string} params.key
 * @param {boolean} params.hasKey
 * @returns {string}
 */
export const getRenderWithSync = ({
    id,
    currentUnique,
    key = '',
    bind,
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
                            ${ATTR_REPEATER_PROP_BIND}="${bind}"
                            ${ATTR_CHILD_REPEATID}="${repeatId}"`;

                const proxiObject = getRepeatProxi({
                    id,
                    bind,
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
                    html: renderHtml,
                });
            })
            .join('');
    };

    return rawRender();
};
