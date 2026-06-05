import { MobJs } from '@mobJs';
import { DetailOffCanvasFn } from './detail-offcanvas';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DetailOffcanvas = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DetailOffcanvasType>} */
    ({
        tag: 'detail-off-canvas',
        component: DetailOffCanvasFn,
        state: {
            active: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
