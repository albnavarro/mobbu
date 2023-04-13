import { componentStore } from '../../baseComponent/componentStore/store';

export const DebugButton = ({ render, onMount }) => {
    onMount(({ element }) => {
        element.addEventListener('click', () => componentStore.debugStore());
    });

    return render(/* HTML */ `
        <button type="button" class="c-btn-debug">debug</button>
    `);
};
