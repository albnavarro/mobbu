/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html, onMount, getState, computed, watch }) => {
    const { sum } = getState();

    onMount(({ refs }) => {
        const { label } = refs;

        computed('sum', ['sate1', 'state2'], (state1, state2) => {
            return state1 + state2;
        });

        watch('sum', (value) => {
            label.textContent = `sum is: ${value}`;
        });
    });

    return html` <div><h2 ref="label">${sum}</h2></div> `;
};
