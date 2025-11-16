import { debugComponentName } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @param {string} id
 */
export const updateDebugComponentById = (id) => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DebugComponent>} */
    const methods = MobJs.useMethodByName(debugComponentName);
    methods?.updateId(id);
};

export const refreshDebugComponentById = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DebugComponent>} */
    const methods = MobJs.useMethodByName(debugComponentName);
    methods?.refreshId();
};
