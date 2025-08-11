import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindEvents, updateState }) => {
    return html`
        <div>
            <my-child-component
                ${bindEvents({
                    click: (event) => {
                        updateState('counter', (value) => (value += 1));
                        event.preventDefault();
                    },
                    onmouseenter: (event) => {
                        updateState('counter', (value) => (value += 1));
                    },
                })}
            ></my-child-component>
        </div>
    `;
};
