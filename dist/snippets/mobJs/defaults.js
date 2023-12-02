import { setDefaultComponent } from './mobjs';

setDefaultComponent({
    isolateCreation: false,
    isolateOnMount: false,
    scoped: false,
    maxParseIteration: 1000,
    debug: true,
});
