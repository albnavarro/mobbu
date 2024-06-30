remove(): void;


/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount, remove }) => {
    onMount(() => {
        setTimeout(() => {
            remove();
        }, 1000);
    });

    return html` <div>my component</div> `;
};
