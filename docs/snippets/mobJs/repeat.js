export type PartialRepeat<T> = (arg0: {
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
    render: (arg0: { sync: string; html?: (arg0: string) => string }) => string;
}) => string;


import { html } from '../mobjs';

function getItems({ sync, bindProps, delegateEvents }) {
    return html`
        <my-child-component
            ${sync} // !important
            ${bindProps({
                bind: ['counter'],
                props: ({ counter, myStateArray }, index) => {
                    return {
                        counter,
                        label: myStateArray[index].label,
                        index: index,
                    };
                },
            })}
            ${delegateEvents({
                click: (event,  index ) => console.log(event, index),
            })}
        >
        </my-child-component>
    `;
}

/**
 * @type {import("../mobjs/type").mobComponent<'myStateArray'|'counter'>}
 */
export const MyComponent = ({ html, repeat, bindProps, delegateEvents }) => {
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
                render: ({ sync }) => {
                    return getItems({
                        sync,
                        bindProps,
                        delegateEvents,
                    });
                },
            })}
        </div>
    `;
};
