/**
export type RenderComponent = (arg0: {
    attachTo: HTMLElement;
    component: string;
    position?: 'afterbegin' | 'beforeend';
    clean?: boolean;
}) => Promise<any>;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({
    onMount,
    bindProps,
    renderComponent,
    setRef,
    getRef,
}) => {
    onMount(async () => {
        const { container } = getRef();

        /**
         * Add new component.
         */
        const runTimeComponent = /* HTML */ `<runtime-component
            ${bindProps({
                bind: ['myState'],
                props: ({ myState }) => {
                    return {
                        childState: myState,
                    };
                },
            })}
        ></runtime-component>`;

        /**
         * Parse container node, and render all component inside. ( async )
         */
        await renderComponent({
            attachTo: container,
            component: runTimeComponent,
            position: 'afterbegin',
            clean: true,
        });
    });

    return html`
        <div>
            <div ${setRef('container')}></div>
        </div>
    `;
};
