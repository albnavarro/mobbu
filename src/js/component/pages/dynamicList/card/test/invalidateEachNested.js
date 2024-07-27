const getInvalidateRender = ({
    staticProps,
    delegateEvents,
    getState,
    bindProps,
    repeat,
}) => {
    const { counter } = getState();

    return html`
        ${createArray(counter)
            .map((item) => {
                return html`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${staticProps({
                                key: `${item}`,
                            })}
                            ${delegateEvents({
                                click: () => {
                                    console.log(
                                        'invalidate inside reepater click'
                                    );
                                },
                            })}
                        >
                        </dynamic-list-card-inner>
                        <div class="c-dynamic-card__invalidate__wrap">
                            ${repeat({
                                watch: 'innerData',
                                render: ({ sync, html }) => {
                                    return html`<dynamic-list-card-inner
                                        ${bindProps({
                                            props: ({ innerData }, index) => {
                                                return {
                                                    key: `${innerData[index].key}`,
                                                };
                                            },
                                        })}
                                        ${sync}
                                    ></dynamic-list-card-inner>`;
                                },
                            })}
                        </div>
                    </div>
                `;
            })
            .join('')}
    `;
};
