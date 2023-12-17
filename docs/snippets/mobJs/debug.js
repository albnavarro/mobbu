import { setDefaultComponent, componentMap } from '../mobjs';

setDefaultComponent({
    /**
     * Add data-mobjs="<id>" to each component
     */
    debug: true,
});

/**
 * All instance component specs.
 */
console.log(componentMap);
