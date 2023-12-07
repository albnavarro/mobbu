import { parseDom } from '../../../src/js/mobjs';

/**
 * @param {import("../../../src/js/mobjs/type").componentType}
 */
export const MyComponent = ({
    html,
    onMount,
    syncParent,
    bindProps,
    removeDOM,
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
            ${syncParent}
        ></runtime-component>`;

        container.insertAdjacentHTML('afterbegin', runTimeComponent);
        await parseDom(container);

        /**
         * Remove new component added.
         */
        button.addEventListener('click', () => {
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
