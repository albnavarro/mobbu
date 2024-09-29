renderComponent: (arg0: {
    attachTo: HTMLElement;
    component: string;
    position?: 'afterbegin' | 'beforeend';
    clean?: boolean;
}) => Promise<any>;

/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({
    html,
    onMount,
    bindProps,
    removeDOM,
    renderComponent,
    setRef,
    getRefs,
}) => {
    onMount(async () => {
        const { container, button } = getRefs();

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
            <button type="button" ${setRef('button')}>Remove component</button>
            <div ${setRef('container')}></div>
        </div>
    `;
};
