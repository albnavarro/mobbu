import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyLayout>}
 */
export const MyLayout = ({ staticProps, bindProps }) => {
    return html`
        <section>
            <mobjs-slot
                ${staticProps({
                    staticFromSlot: `static prop from layout`,
                })}
                ${bindProps({
                    bind: ['mylayoutState'],
                    props: ({ mylayoutState }) => {
                        return {
                            propFromLayout: mylayoutState,
                        };
                    },
                })}
            ></mobjs-slot>
        </section>
    `;
};

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindProps }) => {
    return html`
        <my-layout>
            <my-child
                ${bindProps({
                    bind: ['myState'],
                    props: ({ myState }) => {
                        return {
                            childState: myState,
                        };
                    },
                })}
            ></my-child>
        </my-layout>
    `;
};
