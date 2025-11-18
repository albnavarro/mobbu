import { quickNavName } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @import {UseMethodByName} from "@mobJsType"
 */

/**
 * @type {import('./type').UpdateQuickNavState}
 */
export const updateQuickNavState = ({
    active = true,
    nextRoute = '',
    prevRoute = '',
    backRoute = '',
    color = 'black',
}) => {
    /** @type {UseMethodByName<import('./type').QuickNav>} */
    const methods = MobJs.useMethodByName(quickNavName);
    methods.update('active', active);
    methods.update('nextRoute', nextRoute);
    methods.update('prevRoute', prevRoute);
    methods.update('backRoute', backRoute);
    methods.update('color', color);
};

/**
 * Reset.
 */
MobJs.beforeRouteChange(() => {
    /** @type {UseMethodByName<import('./type').QuickNav>} */
    const methods = MobJs.useMethodByName(quickNavName);
    methods.update('active', false);
    methods.update('nextRoute', '');
    methods.update('prevRoute', '');
    methods.update('backRoute', '');
    methods.update('color', 'black');
});
