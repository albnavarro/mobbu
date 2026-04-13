import { html, htmlObject } from '@mobJs';

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

    return htmlObject({
        content: [
            {
                tag: 'button',
                modules: delegateEvents({
                    click: () => {
                        proxi.counter++;
                    },
                }),
                content: 'click me',
            },
            {
                content: bindObject`counter value is ${() => proxi.counter}`,
            },
            {
                component: ChildComponent,
                modules: bindProps(
                    /** @returns {ReturnBindProps<MyChildState>} */
                    () => ({
                        counter: proxi.counter,
                    })
                ),
            },
        ],
    });
};
