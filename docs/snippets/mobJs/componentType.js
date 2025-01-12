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
**/

/**
 * @type {import("../mobjs/type").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ html }) => {
    return html` <div></div> `;
};
