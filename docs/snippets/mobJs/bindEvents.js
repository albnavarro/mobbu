/**
export interface delegateEventObject {
    [key: string]: (arg0: Event, index: number) => void;
}

export type BindEvents = (
    arg0: bindEventsObject | bindEventsObject[]
) => void;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindEvents, setState }) => {
    return html`
        <div>
            <my-child-component
                ${bindEvents({
                    click: (event) => {
                        setState('counter', (value) => (value += 1));
                        event.preventDefault();
                    },
                    onmouseenter: (event) => {
                        setState('counter', (value) => (value += 1));
                    },
                })}
            ></my-child-component>
        </div>
    `;
};
