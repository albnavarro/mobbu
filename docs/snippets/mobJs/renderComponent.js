/**
export type RenderComponent = (arg0: {
    attachTo: HTMLElement;
    component: string;
    position?: 'afterbegin' | 'beforeend';
    clean?: boolean;
}) => Promise<any>;
**/

/**
 * @type {import("../../../src/js/mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({
    html,
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
