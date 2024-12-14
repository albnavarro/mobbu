import {
    ATTR_CHILD_REPEATID,
    ATTR_CURRENT_LIST_VALUE,
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

/**
 * @param {object} params
 * @param {number} params.diff
 * @param {any} params.current
 * @param {number} params.previousLenght
 * @param {string} params.state
 * @param {string} params.repeatId
 * @param {import('../type').RepeaterRender} params.render
 * @returns {string}
 */
export const getRepeaterRuntimeItemWitoutKey = ({
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
            const currentValue = current?.[index + previousLenght];
            const currentIndex = index + previousLenght;

            const rawRender = render({
                index: currentIndex,
                currentValue,
                html: renderHtml,
                sync: () => '',
            });

            let fragment = document
                .createRange()
                .createContextualFragment(rawRender);

            const components = queryAllFutureComponent(fragment, false);

            setRepeatAttribute({
                components,
                current: currentValue,
                index: currentIndex,
                bind: state,
                repeatId,
                key: undefined,
            });

            const serializedRender = serializeFragment(fragment);

            /**
             * Remove fragment as soon as possible from GC.
             * TODO Is really necessary ?
             */
            fragment = null;
            return serializedRender;
        })
        .join('');

    setSkipAddUserComponent(false);

    return serializedFragment;
};

/**
 * @param {object} params
 * @param {number} params.diff
 * @param {any} params.current
 * @param {number} params.previousLenght
 * @param {string} params.state
 * @param {string} params.repeatId
 * @param {import('../type').RepeaterRender} params.render
 * @returns {string}
 */
export const updateRepeaterRuntimeItemWithoutKeyUseSync = ({
    diff,
    previousLenght,
    current,
    state,
    repeatId,
    render,
}) => {
    return [...new Array(diff).keys()]
        .map((_item, index) => {
            const currentValue = current?.[index + previousLenght];
            const currentIndex = index + previousLenght;

            const sync =
                /* HTML */ () => `${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState(
                    {
                        current: currentValue,
                        index: currentIndex,
                    }
                )}"
            ${ATTR_REPEATER_PROP_BIND}="${state}"
            ${ATTR_CHILD_REPEATID}="${repeatId}"`;

            return render({
                sync,
                index: currentIndex,
                currentValue,
                html: renderHtml,
            });
        })
        .join('');
};

/**
 * @param {object} params
 * @param {Record<string, any>} params.currentValue
 * @param {number} params.index
 * @param {string} params.state
 * @param {string} params.repeatId
 * @param {string} params.key
 * @param {string} params.rawRender
 * @returns {string}
 */
export const getRepeaterRuntimeItemWithtKey = ({
    currentValue,
    index,
    state,
    repeatId,
    key,
    rawRender,
}) => {
    setSkipAddUserComponent(true);

    let fragment = document.createRange().createContextualFragment(rawRender);
    const components = queryAllFutureComponent(fragment, false);

    setRepeatAttribute({
        components,
        current: currentValue,
        index,
        bind: state,
        repeatId,
        key,
    });

    setSkipAddUserComponent(false);

    const serializedRender = serializeFragment(fragment);

    /**
     * Remove fragment as soon as possible from GC.
     * TODO Is really necessary ?
     */
    fragment = null;
    return serializedRender;
};
