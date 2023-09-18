import { componentMap, componentStore, mainStore } from '../../../mobjs';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DebugButton = ({ onMount, html }) => {
    onMount(({ element }) => {
        element.addEventListener('click', () => {
            mainStore.debugStore();
            componentStore.debugStore();
            console.log(componentMap);
        });

        return () => {};
    });

    return html`
        <button type="button" class="c-btn-debug">console debug</button>
    `;
};
