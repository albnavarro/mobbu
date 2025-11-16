import { scrollDownLabelName } from '@instanceName';
import { MobJs } from '@mobJs';

/**
 * @import {UseMethodByName} from '@mobJsType';
 */

/** @type{() => void} */
export const activateScrollDownArrow = () => {
    /** @type {UseMethodByName<import('./type').ScrollDownLabel>} */
    const methods = MobJs.useMethodByName(scrollDownLabelName);
    methods.update(true);
};

/** @type{() => void} */
export const deactivateScrollDownArrow = () => {
    /** @type {UseMethodByName<import('./type').ScrollDownLabel>} */
    const methods = MobJs.useMethodByName(scrollDownLabelName);
    methods.update(false);
};
