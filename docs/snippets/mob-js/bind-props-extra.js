<my-child-component
    ${bindProps({
        bind: ['counter'],
        props: ({ counter, dataArray }, value, index) => {
            return {
                childProp3: dataArray[index].myProp,
                childProp4: counter,
            };
        },
    })}
></my-child-component>
