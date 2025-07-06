/**
export type PartialMethods<T> = <
    K extends keyof Record<string & keyof ExtractMethods<T>, function>,
>(
    name: K,
    fn: ExtractMethods<T>[K]
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
