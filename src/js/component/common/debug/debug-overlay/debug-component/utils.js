import { MobJs } from '@mobJs';
import { debugComponentName } from 'src/js/component/instance-name';

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
