/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({
    invalidate,
    getState,
    staticProps,
    delegateEvents,
}) => {
    return html`
        <div class="invalidate-container">
            ${invalidate({
                observe: [() => proxi.myState, () => proxi.myState2],
                beforeUpdate: () => {
                    //
                },
                afterUpdate: () => {
                    //
                },
                render: () => {
                    return getInvalidateRender({
                        getState,
                        delegateEvents,
                        staticProps,
                    });
                },
            })}
        </div>
    `;
};
