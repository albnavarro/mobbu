import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ delegateEvents, updateState }) => {
    return html`
        <div>
            <button
                ${delegateEvents({
                    click: (event) => {
                        updateState('counter', (value) => (value += 1));
                        event.preventDefault();
                    },
                })}
            >
                my button
            </button>
            <my-child-component
                ${delegateEvents({
                    click: (event) => {
                        updateState('counter', (value) => (value += 1));
                        event.preventDefault();
                    },
                    mousemove: (event) => {
                        updateState('counter', (value) => (value += 1));
                    },
                })}
            ></my-child-component>
        </div>
    `;
};
