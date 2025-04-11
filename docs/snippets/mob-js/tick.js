import { html, MobJs } from '@mobjs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindEvents, bindProps, setState }) => {
    return html`
        <div>
            <my-child-component
                ${bindEvents({
                    click: async () => {
                        setState('counter', (value) => (value += 1));
                        await MobJs.tick();

                        // All app is updated.
                    },
                })}
                ${bindProps({
                    bind: ['counter'],
                    props: ({ counter }) => {
                        return {
                            childProp: counter,
                        };
                    },
                })}
            ></my-child-component>
        </div>
    `;
};
