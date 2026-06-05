import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent<import('./type').AccessibilityToggleType>} */
export const AccessibilityToggleFn = ({ getSelfProxi }) => {
    const proxi = getSelfProxi();
    console.log(proxi.option_a);
    console.log(proxi.option_b);

    return htmlObject({
        className: 'c-accessibility-toggle',
        attributes: {},
        content: 'toggle',
    });
};
