export const createComponentDefinition = ({
    name = '',
    component = {},
    props = {},
    state = {},
}) => {
    return {
        [name]: {
            componentFunction: component,
            componentParams: {
                props,
                state,
            },
        },
    };
};
