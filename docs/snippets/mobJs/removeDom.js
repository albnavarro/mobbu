/**
removeDOM(element: HTMLElement): void;
**/

/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount, removeDOM, setRef, getRef }) => {
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
