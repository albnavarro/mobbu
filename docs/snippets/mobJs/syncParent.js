import { html, MobJs } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ onMount, syncParent, setRef, getRef }) => {
    onMount(async () => {
        const { container } = getRef();

        const myRuntimeComponent = html`<MyComponent
            ${syncParent}
        ></MyComponent>`;

        container.insertAdjacentHTML('afterbegin', myRuntimeComponent);
        await MobJs.parseDom(container);
    });

    /**
     * DOM component structure.
     */
    return html` <div><div ${setRef('container')}></div></div> `;
};
