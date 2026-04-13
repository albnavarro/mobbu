import { MobJs } from '@mobjs';

/**
 * @import {
 *   MobComponent,
 *   UseMethodByName
 * } from "@mobJsType"
 */

/**
 * Use variable for lsp reference.
 */
import { otherComponentName } from '..';
import { htmlObject } from '@mobJs';

/**
 * @type {MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount }) => {
    onMount(() => {
        /** @type {UseMethodByName<import('./otherComponent/type').MyOtherComponent>} */
        const myComponentMethods = MobJs.useMethodByName(otherComponentName);
        myComponentMethods?.myMethod?.();

        return () => {};
    });

    return htmlObject({
        content: {
            component: MyComponent,
            attributes: { name: otherComponentName },
        },
    });
};
