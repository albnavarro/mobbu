// @ts-check

import { useMethodByName } from '../../../mobjs';

/**
 * @import {UseMethodByName} from '../../../mobjs/type'
 */

export const hideFooterShape = () => {
    /** @type  {UseMethodByName<import('./type').FooterShapeV1>} */
    const footerLeftMethods = useMethodByName('footer_shape_left');
    footerLeftMethods?.setPosition({ position: '' });

    /** @type  {UseMethodByName<import('./type').FooterShapeV1>} */
    const footerRightMethods = useMethodByName('footer_shape_right');
    footerRightMethods?.setPosition({ position: '' });
};

export const showFooterShape = () => {
    /** @type  {UseMethodByName<import('./type').FooterShapeV1>} */
    const footerLeftMethods = useMethodByName('footer_shape_left');
    footerLeftMethods?.setPosition({ position: 'center' });

    /** @type  {UseMethodByName<import('./type').FooterShapeV1>} */
    const footerRightMethods = useMethodByName('footer_shape_right');
    footerRightMethods?.setPosition({ position: 'center' });
};
