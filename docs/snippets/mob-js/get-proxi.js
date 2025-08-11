import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({
    getProxi,
    delegateEvents,
    bindText,
    watch,
    bindProps,
}) => {
    /**
     * Label state initial value.
     */
    const proxi = getProxi();

    /**
     * Watch counter mutation
     */
    watch(
        () => proxi.counter,
        (value) => {
            console.log(value);
        }
    );

    /**
     * DOM component structure.
     */
    return html`
        <div>
            <button
                ${delegateEvents({
                    click: () => {
                        proxi.counter++;
                    },
                })}
            >
                click me
            </button>
            <div>${bindText`counter value is ${'counter'}`}</div>
            <child-component
                ${bindProps(
                    /** @returns {ReturnBindProps<MyChildState>} */
                    () => ({
                        counter: proxi.counter,
                    })
                )}
            ></child-component>
        </div>
    `;
};
