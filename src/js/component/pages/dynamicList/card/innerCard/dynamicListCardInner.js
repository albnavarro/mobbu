//@ts-check

/**
 * @type {import("../../../../../mobjs/type").mobComponent<import("./type").DynamicListCardInner>}
 */
export const DynamicListCardInnerFn = async ({
    watch,
    onMount,
    html,
    getState,
}) => {
    const { key } = getState();

    onMount(({ element }) => {
        watch('key', (value) => {
            element.textContent = `${value}`;
        });

        return () => {};
    });

    return html`<span class="dynamic-list-card-inner"> ${key} </span>`;
};
