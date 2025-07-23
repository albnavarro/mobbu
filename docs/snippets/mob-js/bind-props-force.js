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
        <my-child-component
            ${bindProps({
                observe: ['label', 'counter'],
                forceParent: true,
                props: ({ label, counter }) => {
                    return {
                        childProp3: label,
                        childProp4: counter,
                    };
                },
            })}
        ></my-child-component>
    </my-component-inner>
`;
