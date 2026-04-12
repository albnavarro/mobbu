import { MobJs } from '@mobJs';

/**
 * @param {string} name
 */
export const toggleMatrioskaItemActive = (name) => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').MatrioskaItemType>} */
    const methods = MobJs.useMethodByName(name);
    methods.toggleActive();
};
