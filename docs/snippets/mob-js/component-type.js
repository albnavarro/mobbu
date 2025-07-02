/**
type.d.ts

export interface MyComponent {
    state: {
        prop1?: boolean;
        prop2: number;
        prop3: number;
    };
    methods: {
        myMethod: (arg0: { prop1: number; prop2: number }) => void;
    };
    ref: {
        myRef: HTMLElement;
        myRef2: HTMLElement;
    }
}
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = () => {
    return html` <div></div> `;
};
