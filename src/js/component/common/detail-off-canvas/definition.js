import { MobJs } from '@mobJs';
import { DetailOffCanvasFunction } from './detail-offcanvas';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DetailOffcanvas = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DetailOffcanvasType>} */
    ({
        tag: 'detail-off-canvas',
        component: DetailOffCanvasFunction,
        state: {
            active: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
