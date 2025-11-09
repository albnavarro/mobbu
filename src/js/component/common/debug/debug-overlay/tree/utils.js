import { MobJs } from '@mobJs';
import { debugTreeName } from 'src/js/component/instance-name';

export const refreshDebugTree = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DebugTree>} */
    const methods = MobJs.useMethodByName(debugTreeName);
    methods?.refresh();
};
