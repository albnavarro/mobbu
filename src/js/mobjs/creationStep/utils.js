/**
 * Exclude this props becouse if a reserved props keys.
 */
const propsKeyToExclude = ['component', 'key', 'props', 'cancellable'];

/**
 * Check if props is defined in component definition.
 * Exclude reverded props name from check>
 */
export const propsValidate = ({ componentName, defaultProps, props }) => {
    const defaultPropsKeys = Object.keys(defaultProps);
    const notDefinedProps = Object.keys(props).filter((key) => {
        return (
            !defaultPropsKeys.includes(key) && !propsKeyToExclude.includes(key)
        );
    });

    if (notDefinedProps.length)
        console.warn(
            `Some props is not defined in ${componentName}:`,
            notDefinedProps
        );
};
