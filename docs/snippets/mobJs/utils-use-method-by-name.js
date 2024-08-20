// @ts-ignore
import { useMethodByName } from './mobjs';

/**
 * @type {import('./mobjs/type').mobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, html }) => {
    onMount(() => {
        useMethodByName('otherComponent')?.myMethod();
        return () => {};
    });

    return html` <div></div> `;
};
