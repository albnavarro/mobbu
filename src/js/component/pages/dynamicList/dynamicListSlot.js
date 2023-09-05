/**
 * @param {import('../../../mobjs/type').componentType}
 */

function getPreValue(value) {
    return `<pre>${value}</pre>`;
}

export const DynamicListSlot = ({ getState, render, onMount, watch }) => {
    const {
        staticFromSlot,
        staticFromComponent,
        parentParentState,
        parentState,
    } = getState();

    onMount(({ element }) => {
        const tEl = element.querySelector('.js-t-state');
        const t2El = element.querySelector('.js-t2-state');

        watch('parentParentState', (val) => {
            tEl.textContent = '';
            tEl.insertAdjacentHTML('afterbegin', getPreValue(val));
        });

        watch('parentState', (val) => {
            t2El.textContent = '';
            t2El.insertAdjacentHTML('afterbegin', getPreValue(val));
        });

        return () => {};
    });

    return render(/* HTML */ `
        <div class="dynamic-slot">
            <h3 class="dynamic-slot__label">Component inside slot</h3>
            <div>${staticFromSlot}</div>
            <div>${staticFromComponent}</div>
            <h3 class="dynamic-slot__label">
                Reactive state from parent component scope (dynamicList):
            </h3>
            <div class="js-t-state">${getPreValue(parentParentState)}</div>
            <h3 class="dynamic-slot__label">
                Reactive state from parent slot scope (dynamicCard):
            </h3>
            <div class="js-t2-state">${getPreValue(parentState)}</div>
        </div>
    `);
};
