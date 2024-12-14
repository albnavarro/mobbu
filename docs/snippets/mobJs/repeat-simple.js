/**
export type PartialRepeat<T> = <K extends keyof T>(arg0: {
    clean?: boolean;
    persistent: boolean;
    bind: OnlyStringKey<T>;
    key?: string | undefined;
    beforeUpdate?: () => void;
    afterUpdate?: () => void;
    render: (arg0: {
        sync: () => string;
        index: number;
        currentValue: ArrayElement<T[K]>;
        html?: (arg0: string) => string;
    }) => string;
}) => string;
**/

/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({
    html,
    repeat,
    bindProps,
    staticProps,
    delegateEvents,
}) => {
    return html`
        <div class="repeater-container">
            ${repeat({
                bind: 'myStateArray',
                render: ({ html }) => {
                    return html`
                        <my-child-component
                            ${staticProps({
                                staticProp: 'label',
                            })}
                            ${bindProps({
                                bind: ['counter'],
                                props: ({ counter, myStateArray }, index) => {
                                    return {
                                        counter,
                                        label: myStateArray[index].label,
                                        index,
                                    };
                                },
                            })}
                            ${delegateEvents({
                                click: (event, index) =>
                                    console.log(event, index),
                            })}
                        >
                        </my-child-component>
                    `;
                },
            })}
        </div>
    `;
};
