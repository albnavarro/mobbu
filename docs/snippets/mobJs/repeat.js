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

import { html } from '../../../src/js/mobjs';

function getItems({
    sync,
    bindProps,
    staticProps,
    delegateEvents,
    currentValue,
}) {
    /**
     * Use with clean = false || key
     * Without key use bindProps to update the component.
     */
    const { myProps } = currentValue;

    /**
     * 'myStateArray' in bindProps can be omitted.
     * By default the `watch` state will triggere a reaction.
     */
    return html` <div>
        <my-child-component
            ${sync()}
            ${staticProps({
                staticProp: myProps,
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
                click: (event, index) => console.log(event, index),
            })}
        >
            <my-child-component-inner
                ${sync()}
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
            >
            </my-child-component-inner>
        </my-child-component>
    </div>`;
}

/**
 * @type {import("../mobjs/type").mobComponent<'myStateArray'|'counter'>}
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
                persistent: false,
                clean: false,
                key: 'myKey',
                beforeUpdate: () => {
                    //
                },
                afterUpdate: () => {
                    //
                },
                render: ({ sync, currentValue, index }) => {
                    return getItems({
                        sync,
                        bindProps,
                        staticProps,
                        delegateEvents,
                        currentValue,
                    });
                },
            })}
        </div>
    `;
};
