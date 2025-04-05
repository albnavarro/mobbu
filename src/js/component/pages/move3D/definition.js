//@ts-check

import { MobJs } from '../../../mob/mobjs';
import { Move3D } from '../../common/Move3D/definition';
import { Move3DPagefn } from './move3DPage';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

export const Move3DPage = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').Move3DPage>} */
    ({
        name: 'move-3d-page',
        component: Move3DPagefn,
        exportState: ['data', 'prevRoute', 'nextRoute'],
        state: {
            data: () => ({
                value: [],
                type: Array,
            }),
            xDepth: () => ({
                value: 20,
                type: Number,
            }),
            yDepth: () => ({
                value: 20,
                type: Number,
            }),
            xLimit: () => ({
                value: 1000,
                type: Number,
            }),
            yLimit: () => ({
                value: 1000,
                type: Number,
            }),
            perspective: () => ({
                value: 700,
                type: Number,
            }),
            debug: () => ({
                value: false,
                type: Boolean,
            }),
            factor: () => ({
                value: 45,
                type: Number,
                validate: (value) => {
                    return value > 1;
                },
                strict: true,
            }),
        },
        child: [Move3D],
    })
);
