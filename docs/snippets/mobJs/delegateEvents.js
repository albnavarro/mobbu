/**
export interface delegateEventObject {
    [key: string]: (arg0: Event, index: number) => void;
}

export type DelegateEvents = (
    arg0: delegateEventObject | delegateEventObject[]
) => any;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ delegateEvents, setState }) => {
    return html`
        <div>
            <button
                ${delegateEvents({
                    click: (event) => {
                        setState('counter', (value) => (value += 1));
                        event.preventDefault();
                    },
                })}
            >
                my button
            </button>
            <my-child-component
                ${delegateEvents({
                    click: (event) => {
                        setState('counter', (value) => (value += 1));
                        event.preventDefault();
                    },
                    mousemove: (event) => {
                        setState('counter', (value) => (value += 1));
                    },
                })}
            ></my-child-component>
        </div>
    `;
};
