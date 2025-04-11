import { html, MobJs } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
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
