import { parseDom } from '../../../src/js/mobjs';

/**
 * @type {import("../mobjs/type").mobComponent}
 */
export const MyComponent = ({ html, onMount, syncParent }) => {
    onMount(async (refs) => {
        const { container } = refs;

        const myRuntimeComponent = html`<MyComponent
            ${syncParent}
        ></MyComponent>`;

        container.insertAdjacentHTML('afterbegin', myRuntimeComponent);
        await parseDom(container);
    });

    /**
     * DOM component structure.
     */
    return html` <div><div ref="container"></div></div> `;
};
