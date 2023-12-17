import { setDefaultComponent } from '../mobjs';

setDefaultComponent({
    /**
     * Experimental:
     * Add DOM element in a dedicated request animation Frame.
     * If is settled to `false` use a request animation frame to apply
     * class/style inside onMount function ( to have css transition working ).
     * `default = false`.
     */
    isolateCreation: false,

    /**
     * Experimental:
     * Wait one frame after execute onMount function.( for havly onMount function ).
     * Less stress for big script fired inside onMount function.
     * `default = false`.
     */
    isolateOnMount: false,

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
