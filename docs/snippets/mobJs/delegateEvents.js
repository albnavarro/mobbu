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
                    click: (event, index) => {
                        setState('counter', (value) => (value += 1));
                        event.preventDefault(); 
                    },
                })}
            >
                my button
            </button>
            <my-child-component
                ${delegateEvents({
                    click: (event, index) => {
                        setState('counter', (value) => (value += 1));
                        event.preventDefault(); 
                    },
                    onmouseenter: (event, index) => {
                        setState('counter', (value) => (value += 1));
                    },
                })}
            ></my-child-component>
        </div>
    `;
};
