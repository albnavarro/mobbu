import { html, htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ delegateEvents, updateState }) => {
    return htmlObject({
        content: [
            {
                tag: 'button',
                modules: delegateEvents({
                    click: (event) => {
                        updateState('counter', (value) => (value += 1));
                        event.preventDefault();
                    },
                }),
            },
            {
                tag: 'button',
                modules: delegateEvents({
                    click: (event) => {
                        updateState('counter', (value) => (value += 1));
                        event.preventDefault();
                    },
                    mousemove: (event) => {
                        updateState('counter', (value) => (value += 1));
                    },
                }),
            },
        ],
    });
};
