import { html, htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
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

    return htmlObject({
        content: [
            {
                tag: 'button',
                modules: delegateEvents({
                    click: () => {
                        /**
                         * Remove new component added.
                         */
                        const { container } = getRefs();
                        const componentToRemove = container?.firstElementChild;
                        if (!componentToRemove) return;

                        removeDOM(componentToRemove);
                    },
                }),
                content: 'Remove component',
            },
            {
                modules: setRef('container'),
            },
        ],
    });
};
