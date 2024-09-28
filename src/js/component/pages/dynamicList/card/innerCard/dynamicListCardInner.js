//@ts-check

/** @type {import("../../../../../mobjs/type").MobComponent<import("./type").DynamicListCardInner>} */
export const DynamicListCardInnerFn = async ({
    watch,
    onMount,
    html,
    getState,
    setRef,
    getRef,
}) => {
    const { key } = getState();

    onMount(() => {
        const { content } = getRef();

        watch('key', (value) => {
            content.textContent = `${value}`;
        });

        return () => {};
    });

    return html`<span class="dynamic-list-card-inner">
        <span ${setRef('content')}>${key}</span>
    </span>`;
};
