import { MobJs, htmlObject } from '@mobjs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindEvents, bindProps, setState }) => {
    return htmlObject({
        content: {
            component: MyChildComponent,
            modules: [
                bindEvents({
                    click: async () => {
                        setState('counter', (value) => (value += 1));
                        await MobJs.tick();

                        // All app is updated.
                    },
                }),
                bindProps({
                    observe: ['counter'],
                    props: ({ counter }) => {
                        return {
                            childProp: counter,
                        };
                    },
                }),
            ],
        },
    });
};
