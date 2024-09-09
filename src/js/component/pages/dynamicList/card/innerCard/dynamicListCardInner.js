//@ts-check

/**
 * @type {import("../../../../../mobjs/type").MobComponent<import("./type").DynamicListCardInner>}
 */
export const DynamicListCardInnerFn = async ({
    watch,
    onMount,
    html,
    getState,
}) => {
    const { key } = getState();

    onMount(({ ref }) => {
        const { content } = ref;

        watch('key', (value) => {
            content.textContent = `${value}`;
        });

        return () => {};
    });

    return html`<span class="dynamic-list-card-inner">
        <span ref="content">${key}</span>
    </span>`;
};
