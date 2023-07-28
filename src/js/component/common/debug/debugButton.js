import { componentStore, mainStore } from '../../../mobjs';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DebugButton = ({ render, onMount }) => {
    onMount(({ element }) => {
        element.addEventListener('click', () => {
            mainStore.debugStore();
            componentStore.debugStore();
        });
    });

    return render(/* HTML */ `
        <button type="button" class="c-btn-debug">debug</button>
    `);
};
