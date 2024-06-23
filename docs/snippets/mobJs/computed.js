computed(prop: string, keys: string[], callback: () => void): void;



/**
 * @type {import("../mobjs/type").mobComponent<'sum'|'state1'|'state2'>}
 */
export const MyComponent = ({ html, onMount, getState, computed, watch }) => {
    const { sum } = getState();

    onMount(({ refs }) => {
        const { label } = refs;

        computed('sum', ['state1', 'state2'], (state1, state2) => {
            return state1 + state2;
        });

        watch('sum', (value) => {
            label.textContent = `sum is: ${value}`;
        });
    });

    return html` <div><h2 ref="label">${sum}</h2></div> `;
};
