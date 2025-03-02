// @ts-check

import { setStateByName } from '../../../mobjs';

/**
 * @import { SetStateByName } from '../../../mobjs/type';
 **/

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
    const setQuickNavState = setStateByName('quick_nav');
    setQuickNavState('active', active);
    setQuickNavState('nextRoute', nextRoute);
    setQuickNavState('prevRoute', prevRoute);
    setQuickNavState('backRoute', backRoute);
    setQuickNavState('color', color);
};
