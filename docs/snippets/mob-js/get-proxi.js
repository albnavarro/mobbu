import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({
    getProxi,
    delegateEvents,
    bindObject,
    watch,
    bindProps,
}) => {
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
            <div>${bindObject`counter value is ${() => proxi.counter}`}</div>
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
