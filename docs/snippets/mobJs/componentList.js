import { MobJs } from '@mobJs';

/**
 * componentList.js
 */
export * from './path_to_component_1/definition';
export * from './path_to_component_2/definition';
export * from './path_to_component_3/definition';
export * from './path_to_component_4/definition';
export * from './path_to_component_5/definition';
export * from './path_to_component_5/definition';

/**
 * main.js
 */
import * as components from './component/componentList';

MobJs.inizializeApp({
    /**
     * Object that container all component definition.
     */
    components,

    // ...
});
