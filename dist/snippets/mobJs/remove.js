/**
 * @param {import("../../../src/js/mobjs/type").componentType}
 */
export const MyComponent = ({ html, onMount, remove }) => {
    onMount(() => {
        setTimeout(() => {
            remove();
        }, 1000);
    });

    return html` <div>my component</div> `;
};
