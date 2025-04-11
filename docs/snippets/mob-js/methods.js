/**
export type PartialMethods = (
    name: string,
    fn: (...args: any[]) => void
) => void;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ addMethod }) => {
    addMethod('myMethod', (props) => {
        console.log(props);
    });

    return html` <div></div> `;
};
