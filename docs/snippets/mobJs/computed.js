export type Compunted<T> = <K extends keyof T>(
    prop: K,
    keys: Array<NotValue<keyof T, K>>,
    callback: (arg0: T) => T[K]
) => void;


/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
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
