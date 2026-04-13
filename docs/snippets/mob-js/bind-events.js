import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindEvents, updateState }) => {
    return htmlObject({
        content: {
            component: MyChildComponent,
            modules: bindEvents({
                click: (event) => {
                    updateState('counter', (value) => (value += 1));
                    event.preventDefault();
                },
                onmouseenter: (event) => {
                    updateState('counter', (value) => (value += 1));
                },
            }),
        },
    });
};
