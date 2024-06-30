removeDOM(element: HTMLElement): void;


/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount, removeDOM }) => {
    onMount(({ refs }) => {
        const { myDiv } = refs;

        setTimeout(() => {
            removeDOM(myDiv);
        }, 1000);
    });

    return html`
        <div>
            <div ref="myDiv">
                <my-child-component></my-child-component>
            </div>
        </div>
    `;
};
