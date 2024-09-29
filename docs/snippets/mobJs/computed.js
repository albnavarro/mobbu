/**
export type Compunted<T> = <K extends keyof T>(
    prop: K,
    keys: Array<NotValue<keyof T, K>>,
    callback: (arg0: T) => T[K]
) => void;
**/

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({
    html,
    onMount,
    getState,
    computed,
    watch,
    setRef,
    getRef,
}) => {
    const { sum } = getState();

    onMount(() => {
        const { label } = getRef();

        computed('sum', ['state1', 'state2'], ({ state1, state2 }) => {
            return state1 + state2;
        });

        watch('sum', (value) => {
            label.textContent = `sum is: ${value}`;
        });
    });

    return html` <div><h2 ${setRef('label')}>${sum}</h2></div> `;
};
