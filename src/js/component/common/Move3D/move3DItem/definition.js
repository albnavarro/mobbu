//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { Move3DItemfn } from './Move3DItem';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const Move3DItem = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').Move3DItem>} */
    ({
        name: 'move-3d-item',
        component: Move3DItemfn,
        exportState: [
            'root',
            'depth',
            'rotate',
            'width',
            'height',
            'offsetX',
            'offsetY',
            'range',
            'animate',
            'anchorPoint',
            'classList',
            'component',
            'initialRotate',
            'initialDepth',
        ],
        state: {
            root: () => ({
                value: true,
                type: Boolean,
            }),
            depth: () => ({
                value: 0,
                type: Number,
            }),
            rotate: () => ({
                value: 'x',
                type: String,
            }),
            id: () => ({
                value: '',
                type: String,
            }),
            width: () => ({
                value: 10,
                type: Number,
            }),
            height: () => ({
                value: 10,
                type: Number,
            }),
            offsetX: () => ({
                value: 0,
                type: Number,
            }),
            offsetY: () => ({
                value: 0,
                type: Number,
            }),
            range: () => ({
                value: 20,
                type: Number,
            }),
            anchorPoint: () => ({
                value: 'center',
                type: String,
            }),
            animate: () => ({
                value: true,
                type: Boolean,
            }),
            initialRotate: () => ({
                value: 0,
                type: Number,
            }),
            initialDepth: () => ({
                value: 0,
                type: Number,
            }),
            classList: () => ({
                value: '',
                type: String,
            }),
            component: {
                tagName: () => ({
                    value: '',
                    type: String,
                }),
                className: () => ({
                    value: '',
                    type: String,
                }),
                props: () => ({
                    value: '',
                    type: 'any',
                }),
            },
        },
    })
);
