import { MobJs } from '@mobJs';
import { StarSvgFunction } from './star-svg';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const StarSvg = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').StarSvg>} */
    ({
        tag: 'svg-star',
        component: StarSvgFunction,
        props: {
            fill: {
                __value: '#000000',
                __type: String,
            },
        },
    })
);
