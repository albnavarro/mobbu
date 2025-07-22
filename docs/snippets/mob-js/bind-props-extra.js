<my-child-component
    ${bindProps({
        observe: ['counter'],
        props: ({ counter, dataArray }, value, index) => {
            return {
                childProp3: dataArray[index].myProp,
                childProp4: counter,
            };
        },
    })}
></my-child-component>
