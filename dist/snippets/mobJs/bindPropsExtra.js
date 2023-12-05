return html`
    <div>
        <my-child-component
            ${bindProps({
                bind: ['label', 'counter'],
                props: ({ label, counter, _index, _current }) => {
                    return {
                        childProp3: label,
                        childProp4: counter,
                    };
                },
            })}
        ></my-child-component>
    </div>
`;
