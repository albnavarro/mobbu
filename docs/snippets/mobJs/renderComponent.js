renderComponent: (arg0: {
    attachTo: HTMLElement;
    component: string;
    position?: 'afterbegin' | 'beforeend';
    clean?: boolean;
}) => Promise<any>;


/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({
    html,
    onMount,
    bindProps,
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
    });

    return html`
        <div>
            <div ref="container"></div>
        </div>
    `;
};
