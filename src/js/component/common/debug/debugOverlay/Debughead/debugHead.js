/**
 * @import { GetRef, MobComponent } from '../../../../../mobjs/type';
 **/

import {
    componentMap,
    getDebugMode,
    getNumberOfActiveInvalidate,
    getNumberOfActiveRepeater,
    html,
    mainStore,
} from '../../../../../mobjs';

/**
 * @param {object} params
 * @param {boolean} params.active
 * @param {GetRef} params.getRef
 */
const updateContent = ({ active, getRef }) => {
    const { number_of_component, active_repeater, active_invalidate } =
        getRef();

    // number of component
    const NOC_content = active
        ? html`<strong>Number of component</strong>: ${componentMap.size} (
              excluded debug generated content )`
        : ``;
    number_of_component.innerHTML = NOC_content;

    // active repeater
    active_repeater.innerHTML = html`<strong>number of active repeater</strong>:
        ${getNumberOfActiveRepeater()}`;

    // active invalidate
    active_invalidate.innerHTML = html`<strong
            >number of active invalidate</strong
        >: ${getNumberOfActiveInvalidate()}`;
};

/** @type{MobComponent<import('./type').Debughead>} */
export const DebugHeadFn = ({
    html,
    onMount,
    getState,
    setRef,
    getRef,
    watch,
}) => {
    onMount(() => {
        watch('active', async (active) => {
            updateContent({ active, getRef });
        });

        const unsubscrineRoute = mainStore.watch(
            'afterRouteChange',
            async () => {
                const { active } = getState();
                updateContent({ active, getRef });
            }
        );

        return () => {
            unsubscrineRoute();
        };
    });

    return html`<div class="c-debug-head">
        <div class="c-debug-head__general">
            <div>
                <strong> Debug activated: </strong>
                ${getDebugMode()}
            </div>
            <div class="c-debug-head__total" ${setRef('number_of_component')}>
                <strong>Number of component</strong>: ${componentMap.size} (
                excluded debug )
            </div>
            <div
                class="c-debug-head__repeater"
                ${setRef('active_repeater')}
            ></div>
            <div
                class="c-debug-head__invalidate"
                ${setRef('active_invalidate')}
            ></div>
        </div>
        <div class="c-debug-head__search">
            <div>
                <debug-search></debug-search>
            </div>
        </div>
    </div>`;
};
