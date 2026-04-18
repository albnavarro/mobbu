import { setRepeatAttribute } from '../../../parse/steps/utils';
import { queryAllFutureComponent } from '../../../query/query-all-future-component';
import { REPATE_PROXI_FAIL } from './constant';
import { getRepeatProxi } from './get-proxi';

/**
 * - Add without key ( update step ).
 *
 * @param {object} params
 * @param {number} params.diff
 * @param {any} params.current
 * @param {number} params.previousLenght
 * @param {string} params.state
 * @param {string} params.repeatId
 * @param {import('../type').RepeaterRender} params.render
 * @returns {HTMLElement[]}
 */
export const updateRepeaterWitoutKey = ({
    diff,
    current,
    previousLenght,
    render,
    state,
    repeatId,
}) => {
    /**
     * Create palcehodler component
     */
    const renderedDOM = [...Array.from({ length: diff }).keys()].map(
        (_item, index) => {
            const initialValue = current?.[index + previousLenght];
            const initialIndex = index + previousLenght;

            const proxiObject = getRepeatProxi({
                observe: state,
                hasKey: false,
                index: initialIndex,
                repeatId,
            });

            /**
             * If proxi return false repeater is destroyed before proxi creation
             *
             * - Should skip item render
             */
            if (proxiObject?.['value'] === REPATE_PROXI_FAIL) return;

            const rawRender = render({
                initialIndex,
                initialValue,
                current: proxiObject,
            });

            /**
             * - Get all child component once
             * - SetSkipAddUserComponent prevents the component's host from being added to the list of components to be
             *   rendered.
             * - Set manually attribute for each component inside InMemoryElementSet
             */
            const components = queryAllFutureComponent(rawRender, false).map(
                (element) => {
                    return new WeakRef(element);
                }
            );

            /**
             * - Set manually attribute for each component found with query.
             */
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
            return rawRender;
        }
    );

    return renderedDOM.filter(
        (element) => element !== null && element !== undefined
    );
};

/**
 * - Add with key ( update step ).
 *
 * @param {object} params
 * @param {Record<string, any>} params.currentValue
 * @param {number} params.index
 * @param {string} params.state
 * @param {string} params.repeatId
 * @param {any} params.keyValue
 * @param {string | undefined} params.key
 * @param {import('../type').RepeaterRender} params.render
 * @returns {HTMLElement | undefined}
 */
export const updateRepeaterWithtKey = ({
    currentValue,
    index,
    state,
    repeatId,
    key,
    keyValue,
    render,
}) => {
    const proxiObject = getRepeatProxi({
        observe: state,
        hasKey: true,
        key,
        keyValue,
        index,
        repeatId,
    });

    /**
     * If proxi return false repeater is destroyed before proxi creation
     *
     * - Should skip item render
     */
    if (proxiObject?.['value'] === REPATE_PROXI_FAIL) return;

    /**
     * Here each userComponent:
     *
     * - Fire his constructor
     * - This step is fundamantal to add repeater attribute to custom component.
     */
    const fragment = render({
        initialIndex: index,
        initialValue: currentValue,
        current: proxiObject,
    });

    /**
     * - Get all child component once
     * - SetSkipAddUserComponent prevents the component's host from being added to the list of components to be rendered.
     */
    const components = queryAllFutureComponent(fragment, false).map(
        (element) => {
            return new WeakRef(element);
        }
    );

    /**
     * - Set manually attribute for each component found with query.
     */
    setRepeatAttribute({
        components,
        current: currentValue,
        index,
        observe: state,
        repeatId,
        key: keyValue,
    });

    /**
     * Remove fragment as soon as possible from GC. TODO Is really necessary ?
     */
    return fragment;
};

/**
 * - First render step, ( directly from get-params-for-component.js )
 *
 * @param {object} params
 * @param {Record<string, any>[]} params.currentUnique
 * @param {import('../type').RepeaterRender} params.render
 * @param {string} params.observe
 * @param {string} params.repeatId
 * @param {string | undefined} params.key
 * @param {boolean} params.hasKey
 * @returns {HTMLElement[]}
 */
export const getRepeatIntialRender = ({
    currentUnique,
    render,
    observe,
    repeatId,
    key = '',
    hasKey,
}) => {
    /**
     * Render immediately first DOM
     */
    const renderedDOM = currentUnique.map((item, index) => {
        const proxiObject = getRepeatProxi({
            observe,
            hasKey,
            key,
            keyValue: hasKey ? item?.[key] : '',
            index,
            repeatId,
        });

        /**
         * If proxi return false repeater is destroyed before proxi creation
         *
         * - Should skip item render
         */
        if (proxiObject?.['value'] === REPATE_PROXI_FAIL) return;

        const fragment = render({
            initialIndex: index,
            initialValue: item,
            current: proxiObject,
        });

        /**
         * - Get all child component once
         * - SetSkipAddUserComponent prevents the component's host from being added to the list of components to be
         *   rendered.
         */
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
        return fragment;
    });

    return renderedDOM.filter(
        (element) => element !== null && element !== undefined
    );
};
