/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({
    html,
    onMount,
    bindProps,
    removeDOM,
    parseDom,
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

        container.insertAdjacentHTML('afterbegin', runTimeComponent);

        /**
         * Parse container node, and render all component inside. ( async )
         */
        await parseDom(container);

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
