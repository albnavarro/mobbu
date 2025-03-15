return html`
    <my-component
        ${bindProps({
            props: () => {
                return {
                    counter: proxi.counter,
                };
            },
        })}
    >
        <my-component-inner
            slot="my-slot"
            ${bindProps({
                // here we bind <my-component> counter state, with forceParent.
                forceParent: true,
                props: () => {
                    return {
                        counter: proxi.counter,
                    };
                },
            })}
        >
        </my-component>
    </my-component-inner>
`;
