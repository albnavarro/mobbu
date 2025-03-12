/**
removeDOM(element: HTMLElement): void;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").mobComponent<import('./type').State>}
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
