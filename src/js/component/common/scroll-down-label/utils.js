import { MobJs } from '@mobJs';
import { scrollDownLabelName } from '../../instance-name';

/**
 * @import {SetStateByName} from '@mobJsType';
 */

/** @type{() => void} */
export const activateScrollDownArrow = () => {
    /** @type {SetStateByName<import('./type').ScrollDownLabel>} */
    const setScrollDownState = MobJs.setStateByName(scrollDownLabelName);
    setScrollDownState('active', true);
};

/** @type{() => void} */
export const deactivateScrollDownArrow = () => {
    /** @type {SetStateByName<import('./type').ScrollDownLabel>} */
    const setScrollDownState = MobJs.setStateByName(scrollDownLabelName);
    setScrollDownState('active', false);
};
