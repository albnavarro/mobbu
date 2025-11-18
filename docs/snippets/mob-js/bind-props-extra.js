<my-child-component
    ${bindProps({
        observe: ['counter'],
        props: ({ counter }, value, index) => {
            return {
                childProp3: value.myProp,
                childProp4: counter,
            };
        },
    })}
></my-child-component>
