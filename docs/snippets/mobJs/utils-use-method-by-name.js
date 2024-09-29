// @ts-ignore
import { useMethodByName } from '../../../src/js/mobjs';

/**
 * @type {import('../../../src/js/mobjs/type').mobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, html }) => {
    onMount(() => {
        /**
         * It is a good idea to use the Optional chaining to ensure that the
         * component is mounted if you use it directly inside the onMount() function.
         */
        useMethodByName('myComponentName')?.myMethod();
        return () => {};
    });

    return html`
        <div>
            <my-component name="myComponentName"> </my-component>
        </div>
    `;
};
