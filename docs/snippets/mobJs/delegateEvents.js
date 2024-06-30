export interface delegateEventObject {
    [key: string]: (arg0: Event, arg1: { current: any; index: number }) => void;
}

export type DelegateEvents = (
    arg0: delegateEventObject | delegateEventObject[]
) => any;


/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
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
