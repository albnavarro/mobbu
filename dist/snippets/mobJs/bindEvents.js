/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({ html, bindEvents, setState }) => {
    return html`
        <div>
            <my-child-component
                ${bindEvents({
                    click: (e, { current, index }) => {
                        setState('counter', (value) => (value += 1));
                    },
                    onmouseenter: (e, { current, index }) => {
                        setState('counter', (value) => (value += 1));
                    },
                })}
            ></my-child-component>
        </div>
    `;
};
