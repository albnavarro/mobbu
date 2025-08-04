import { MobJs } from '@mobJs';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const MyComponent = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').MyComponent>} */
    ({
        ...
        bindStore: MobJs.mainStore,
        ...
    })
);
