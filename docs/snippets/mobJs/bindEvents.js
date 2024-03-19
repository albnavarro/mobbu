bindEvents(
    arg0:
        | { [key: string]: (arg0: object) => {} }
        | [{ [key: string]: (arg0: object) => {} }]
): void;


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
