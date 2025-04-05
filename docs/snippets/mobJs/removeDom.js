/**
removeDOM(element: HTMLElement): void;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, removeDOM, setRef, getRef }) => {
    onMount(() => {
        const { myDiv } = getRef();

        setTimeout(() => {
            removeDOM(myDiv);
        }, 1000);
    });

    return html`
        <div>
            <div ${setRef('myDiv')}>
                <my-child-component></my-child-component>
            </div>
        </div>
    `;
};
