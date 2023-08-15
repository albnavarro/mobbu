/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const TestComponent3 = async ({ getState, render, onMount, watch }) => {
    const { staticFromSlot, parentParentState, parentState, counter } =
        getState();

    onMount(({ element }) => {
        const counter1El = element.querySelector('.js-counter');
        const t2El = element.querySelector('.js-t2-state');

        watch('counter', (val) => {
            counter1El.textContent = val;
        });

        watch('parentState', (val) => {
            t2El.textContent = val;
        });

        return () => {};
    });

    return render(/* HTML */ `
        <div class="c-test3-comp">
            <h4>t3</h4>
            <div>slot2</div>
            <div>${staticFromSlot}</div>
            <div>${parentParentState}</div>
            <div class="js-t2-state">${parentState}</div>
            <div class="js-counter">${counter}</div>
        </div>
    `);
};
