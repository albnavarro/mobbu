/**
export type PartialMethods = (
    name: string,
    fn: (...args: any[]) => void
) => void;
**/

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, addMethod }) => {
    addMethod('myMethod', (props) => {
        console.log(props);
    });

    return html` <div></div> `;
};
