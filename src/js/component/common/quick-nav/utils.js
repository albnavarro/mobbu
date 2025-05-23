import { MobJs } from '@mobJs';
import { quickNavName } from '../../instance-name';

/**
 * @import {SetStateByName} from '@mobJsType';
 */

/**
 * @type {import('./type').UpdateQuickNavState}
 */
export const updateQuickNavState = ({
    active = true,
    nextRoute = '',
    prevRoute = '',
    backRoute = '',
    color = 'white',
}) => {
    /** @type {SetStateByName<import('./type').QuickNav>} */
    const setQuickNavState = MobJs.setStateByName(quickNavName);
    setQuickNavState('active', active);
    setQuickNavState('nextRoute', nextRoute);
    setQuickNavState('prevRoute', prevRoute);
    setQuickNavState('backRoute', backRoute);
    setQuickNavState('color', color);
};
