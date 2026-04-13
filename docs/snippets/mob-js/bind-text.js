import { html, htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindText }) => {
    return htmlObject({
        content: [
            {
                content: bindText`<h1>title</h1> ${'state'} / ${'state2'}`,
            },
            {
                content: bindText`some text ${'state.prop1.prop2'}`,
            },
            {
                content: bindText`some text ${'state[0]'}`,
            },

            /**
             * Use with slot
             */
            {
                component: ChildComponent,
                content: bindText`text ${'state'}`,
            },
        ],
    });
};
