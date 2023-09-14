import { componentStore, mainStore } from '../../../mobjs';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DebugButton = ({ render, onMount }) => {
    onMount(({ element }) => {
        console.log(element);
        element.addEventListener('click', () => {
            console.log('click');
            mainStore.debugStore();
            componentStore.debugStore();
        });

        return () => {};
    });

    return render(/* HTML */ `
        <button type="button" is="debug-button" class="c-btn-debug">
            console debug
        </button>
    `);
};
