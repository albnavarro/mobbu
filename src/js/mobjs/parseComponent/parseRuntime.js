import { createRunTimeComponent } from '../utils';
import { mainStore } from '../mainStore/mainStore';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.container
 * @return void
 *
 * Parse DOM element searching component.
 * in recursive mode until there is.
 * All parse has a runtime idd.
 */
export const parseRuntime = async ({ container }) => {
    /**
     * Search for innercomponent and add a runtime id
     * So run a concurrent parseComponents outside the main parse.
     */
    const { uniqueId, hasComponentInside } = createRunTimeComponent({
        container,
    });

    if (!hasComponentInside) return;

    /**
     * Parse inner component.
     * Use pub/sub to avoid circular dependencies.
     */
    mainStore.set(
        'parseComponentEvent',
        { element: container, runtimeId: uniqueId },
        false
    );
    await mainStore.emitAsync('parseComponentEvent');

    parseRuntime({ container });
};
