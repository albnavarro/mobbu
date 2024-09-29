/**
staticProps(arg0: { [key: string]: any }): string;
**/

/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
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
