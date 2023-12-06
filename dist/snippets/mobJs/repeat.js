import { html } from '../mobjs';

function getItems({ sync, bindProps, delegateEvents }) {
    return html`
        <my-child-component
            ${bindProps({
                bind: ['counter'],
                props: ({ counter, _current, _index }) => {
                    return {
                        counter,
                        label: _current.label,
                        index: _index,
                    };
                },
            })}
            ${delegateEvents({
                click: (_e, { current, index }) => console.log(current, index),
            })}
            ${sync} // !important
        >
        </my-child-component>
    `;
}

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const MyComponent = ({ html, repeat, bindProps, delegateEvents }) => {
    return html`
        <div>
            ${repeat({
                watch: 'myArray',
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
