/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html, getState, staticProps }) => {
    const { label } = getState();

    return html`
        <div>
            <my-child-component
                ${staticProps({
                    childProp1: label,
                    childProp2: 'myValue',
                })}
            ></my-child-component>
        </div>
    `;
};
