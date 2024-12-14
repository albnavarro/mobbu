import {
    renderHtml,
    serializeFragment,
    setRepeatAttribute,
} from '../../../parse/steps/utils';
import { queryAllFutureComponent } from '../../../query/queryAllFutureComponent';
import { setSkipAddUserComponent } from '../../userComponent';

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
export const getRepeaterRuntimeItemWitoutKeySync = ({
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
            });

            const fragment = document
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

            return serializeFragment(fragment);
        })
        .join('');

    setSkipAddUserComponent(false);

    return serializedFragment;
};
