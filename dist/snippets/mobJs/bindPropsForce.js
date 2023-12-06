return html`
    <my-component
        ${bindProps({
            bind: ['counter', 'data'],
            props: ({ counter }) => {
                return {
                    counter,
                };
            },
        })}
    >
        <my-component-inner
            slot="my-slot"
            ${bindProps({
                // here we bind <my-component> counter state.
                bind: ['counter'],
                forceParent: true,
                props: ({ counter }) => {
                    return {
                        counter,
                    };
                },
            })}
        >
        </my-component>
    </my-component-inner>
`;
