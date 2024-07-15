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

    onMount(({ ref }) => {
        const { keyRef } = ref;

        watch('key', (value) => {
            keyRef.textContent = `${value}`;
        });

        return () => {};
    });

    return html`<span class="dynamic-list-card-inner">
        <span ref="keyRef">${key}</span>
    </span>`;
};
