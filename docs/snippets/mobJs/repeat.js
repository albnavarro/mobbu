export type PartialRepeat<T> = <K extends keyof T>(arg0: {
    clean?: boolean;
    watch: OnlyStringKey<T>;
    key?: string | undefined;
    beforeUpdate?(arg0: {
        element: HTMLElement;
        container: HTMLElement;
        childrenId: string[];
    }): void;
    afterUpdate?(arg0: {
        element: HTMLElement;
        container: HTMLElement;
        childrenId: string[];
    }): void;
    render: (arg0: {
        sync: string;
        index: number;
        currentValue: ArrayElement<T[K]>;
        html?: (arg0: string) => string;
    }) => string;
}) => string;

import { html } from '../mobjs';

function getItems({
    sync,
    bindProps,
    staticProps,
    delegateEvents,
    currentValue,
}) {
    const { myProps } = currentValue;

    /**
     * 'myStateArray' in bindProps can be omitted.
     * By default the `watch` state will triggere a reaction.
     */
    return html`
        <my-child-component
            ${sync} // !important
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
    `;
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
        <div>
            ${repeat({
                watch: 'myStateArray',
                clean: false,
                key: 'myKey',
                beforeUpdate: ({ element, container, childrenId }) => {
                    //
                },
                afterUpdate: ({ element, childrenId, element }) => {
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
