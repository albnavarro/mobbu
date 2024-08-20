// @ts-ignore
import { useMethodByName } from './mobjs';

/**
 * @type {import('./mobjs/type').mobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, html }) => {
    onMount(() => {
        /**
         * It is a good idea to use the Optional chaining to ensure that the
         * component is mounted if you use it directly inside the onMount() function.
         */
        useMethodByName('otherComponent')?.myMethod();
        return () => {};
    });

    return html` <div></div> `;
};
