delegateEvents(
    arg0:
        | { [key: string]: (arg0: object) => {} }
        | [{ [key: string]: (arg0: object) => {} }]
): void;


/**
 * @type {import("../mobjs/type").mobComponent<'counter'>}
 */
export const MyComponent = ({ html, delegateEvents, setState }) => {
    return html`
        <div>
            <button
                ${delegateEvents({
                    click: (e, { current, index }) => {
                        setState('counter', (value) => (value += 1));
                    },
                })}
            >
                my button
            </button>
            <my-child-component
                ${delegateEvents({
                    click: (e, { current, index }) => {
                        setState('counter', (value) => (value += 1));
                    },
                    onmousedown: (e, { current, index }) => {
                        setState('counter', (value) => (value += 1));
                    },
                })}
            ></my-child-component>
        </div>
    `;
};
