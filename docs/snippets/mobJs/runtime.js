renderComponent: (arg0: {
    attachTo: HTMLElement;
    component: string;
    position?: 'afterbegin' | 'beforeend';
    clean?: boolean;
}) => Promise<any>;


/**
 * @param {import("../../../src/js/mobjs/type").componentType}
 */
export const MyComponent = ({
    html,
    onMount,
    bindProps,
    removeDOM,
    renderComponent,
}) => {
    onMount(async ({ refs }) => {
        const { container, button } = refs;

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

        /**
         * Remove new component added.
         */
        button.addEventListener('click', () => {
            /**
             * Remove firstChild of container node and all component reference inside.
             */
            const componentToRemove = container.firstElementChild;
            removeDOM(componentToRemove);
        });
    });

    return html`
        <div>
            <button type="button" ref="button">Remove component</button>
            <div ref="container"></div>
        </div>
    `;
};
