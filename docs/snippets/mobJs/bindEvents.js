export interface bindEventsObject {
    [key: string]: (arg0: Event, arg1: { current: any; index: number }) => void;
}

export type BindEvents = (
    arg0: bindEventsObject | bindEventsObject[]
) => void;


/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, bindEvents, setState }) => {
    return html`
        <div>
            <my-child-component
                ${bindEvents({
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
