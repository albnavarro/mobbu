return html`
    <my-component
        ${bindProps({
            bind: ['counter'],
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
                bind: ['counter'],
                // here we bind <my-component> counter state, with forceParent.
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
