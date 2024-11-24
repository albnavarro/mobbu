// @ts-check

import { setStateByName } from '../../../mobjs';

/**
 * @import { SetStateByName } from '../../../mobjs/type';
 **/

/** @type{import("./type").UpdateCodeButton} */
export const updateCodeButton = ({ drawers = [], color = 'black' }) => {
    /** @type {SetStateByName<import('./type').CodeButton>} */
    const setCodeButtonState = setStateByName('global-code-button');

    setCodeButtonState('drawers', drawers);
    setCodeButtonState('color', color);
};

export const resetCodeButton = () => {
    /** @type {SetStateByName<import('./type').CodeButton>} */
    const setCodeButtonState = setStateByName('global-code-button');

    setCodeButtonState('drawers', []);
    setCodeButtonState('color', 'black');
};
