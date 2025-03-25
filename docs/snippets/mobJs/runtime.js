/**
renderComponent: (arg0: {
    attachTo: HTMLElement;
    component: string;
    position?: 'afterbegin' | 'beforeend';
    clean?: boolean;
}) => Promise<any>;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({
    onMount,
    bindProps,
    removeDOM,
    renderComponent,
    setRef,
    getRefs,
    delegateEvents,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(async () => {
        const { container } = getRefs();

        /**
         * Add new component.
         */
        const runTimeComponent = html`<runtime-component
            ${bindProps(() => ({
                childState: proxi.myState,
            }))}
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
            <button
                type="button"
                ${delegateEvents({
                    click: () => {
                        /**
                         * Remove new component added.
                         */
                        const { container } = getRefs();
                        const componentToRemove = container?.firstElementChild;
                        if (!componentToRemove) return;

                        removeDOM(componentToRemove);
                    },
                })}
            >
                Remove component
            </button>
            <div ${setRef('container')}></div>
        </div>
    `;
};
