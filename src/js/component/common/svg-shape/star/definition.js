import { MobJs } from '@mobJs';
import { StarSvgFn } from './star-svg';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const StarSvg = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').StarSvg>} */
    ({
        tag: 'svg-star',
        component: StarSvgFn,
        exportState: ['fill'],
        state: {
            fill: () => ({
                value: '#000000',
                type: String,
            }),
        },
    })
);
