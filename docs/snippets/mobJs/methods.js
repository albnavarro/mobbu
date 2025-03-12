/**
export type PartialMethods = (
    name: string,
    fn: (...args: any[]) => void
) => void;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ addMethod }) => {
    addMethod('myMethod', (props) => {
        console.log(props);
    });

    return html` <div></div> `;
};
