// @ts-check

import { setStateByName } from '../../../mobjs';

/**
 * @import { SetStateByName } from '../../../mobjs/type';
 **/

/**
 * @type {import('./type').updateQuickNavState}
 */
export const updateQuickNavState = ({
    active = true,
    nextRoute = '',
    prevRoute = '',
    color = 'white',
}) => {
    /** @type {SetStateByName<import('./type').QuickNav>} */
    const setQuickNavState = setStateByName('quick_nav');
    setQuickNavState('active', active);
    setQuickNavState('nextRoute', nextRoute);
    setQuickNavState('prevRoute', prevRoute);
    setQuickNavState('color', color);
};

export const resetQuickNavState = () => {
    /** @type {SetStateByName<import('./type').QuickNav>} */
    const setQuickNavState = setStateByName('quick_nav');
    setQuickNavState('active', false);
    setQuickNavState('nextRoute', '');
    setQuickNavState('prevRoute', '');
    setQuickNavState('color', 'white');
};
