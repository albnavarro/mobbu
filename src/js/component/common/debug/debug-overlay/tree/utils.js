import { debugTreeName } from '@instanceName';
import { MobJs } from '@mobJs';

export const refreshDebugTree = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DebugTreeType>} */
    const methods = MobJs.useMethodByName(debugTreeName);
    methods?.refresh();
};
