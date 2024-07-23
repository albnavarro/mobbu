const getInvalidateRender = ({
    staticProps,
    delegateEvents,
    getState,
    invalidate,
    bindProps,
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
                            ${invalidate({
                                bind: ['innerData'],
                                render: () => {
                                    const { innerData } = getState();
                                    console.log('render');

                                    return createArray(counter)
                                        .map((item2) => {
                                            return html`
                                                <div>${innerData.length}</div>

                                                <dynamic-list-card-inner
                                                    ${bindProps({
                                                        bind: ['counter'],
                                                        props: () => {
                                                            return {
                                                                key: `${item2}`,
                                                            };
                                                        },
                                                    })}
                                                >
                                                </dynamic-list-card-inner>
                                            `;
                                        })
                                        .join('');
                                },
                            })}
                        </div>
                    </div>
                `;
            })
            .join('')}
    `;
};
