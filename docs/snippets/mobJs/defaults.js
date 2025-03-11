import { MobJs } from '../../../src/js/mobjs';

MobJs.setDefaultComponent({
    /**
     * Fire onMount callback immediately, normally onMount is fired after all
     * components have been created.
     * This means that if `scoped:true` e.g. every querySelector fired inside
     * onMount function is scoped inside current component,
     * but has no effect to child component.
     * `default = false`.
     */
    scoped: false,

    /**
     * DOM creation use a recursive function, this value limit the number of iteration.
     * Prevent infinite loop, in case of error or wrong component incapsulation
     */
    maxParseIteration: 1000,

    /**
     * Add data-mobjs="<id>" to each component
     */
    debug: true,
});
