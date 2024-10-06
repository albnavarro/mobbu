/**
 * @import { MobComponent } from '../../../../../../mobjs/type';
 **/

import { componentMap, mainStore } from '../../../../../../mobjs';

const updateContent = ({ active, value, getRef }) => {
    const { number_of_component } = getRef();

    const content = active ? `Number of component: ${value}` : ``;
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
            updateContent({
                active,
                value: componentMap.size,
                getRef,
            });
        });

        mainStore.watch('afterRouteChange', async () => {
            const { active } = getState();

            updateContent({
                active,
                value: componentMap.size,
                getRef,
            });
        });

        return () => {};
    });

    return html`<div class="c-debug-head">
        <span
            class="c-debug-head__total"
            ${setRef('number_of_component')}
        ></span>
    </div>`;
};
