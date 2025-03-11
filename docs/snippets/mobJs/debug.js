import { MobJs } from '../../../src/js/mobjs';

MobJs.setDefaultComponent({
    /**
     * Add data-mobjs="<id>" to each component
     */
    debug: true,
});

/**
 * All instance component specs.
 */
console.log(MobJs.componentMap);
