return html`
    <div>
        <my-child-component
            ${bindProps({
                bind: ['dataArray', 'counter'],
                props: ({ dataArray, counter }, index) => {
                    const { dataArray } = getState();

                    return {
                        childProp3: dataArray[index].myProp,
                        childProp4: counter,
                    };
                },
            })}
        ></my-child-component>
    </div>
`;
