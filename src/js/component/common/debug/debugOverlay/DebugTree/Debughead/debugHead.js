/**
 * @import { GetRef, MobComponent } from '../../../../../../mobjs/type';
 **/

import { componentMap, mainStore } from '../../../../../../mobjs';

/**
 * @param {object} params
 * @param {boolean} params.active
 * @param {GetRef} params.getRef
 */
const updateContent = ({ active, getRef }) => {
    const { number_of_component } = getRef();

    const content = active ? `Number of component: ${componentMap.size}` : ``;
    number_of_component.textContent = content;
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

        const unsubscrineRoue = mainStore.watch(
            'afterRouteChange',
            async () => {
                const { active } = getState();
                updateContent({ active, getRef });
            }
        );

        return () => {
            unsubscrineRoue();
        };
    });

    return html`<div class="c-debug-head">
        <span
            class="c-debug-head__total"
            ${setRef('number_of_component')}
        ></span>
    </div>`;
};
