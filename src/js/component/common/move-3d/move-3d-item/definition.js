import { MobJs } from '@mobJs';
import { Move3DItemfn } from './move-3d-item';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const Move3DItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Move3DItem>} */
    ({
        tag: 'move-3d-item',
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
                value: '0px',
                type: String,
            }),
            height: () => ({
                value: '0px',
                type: String,
            }),
            offsetX: () => ({
                value: '0px',
                type: String,
            }),
            offsetY: () => ({
                value: '0px',
                type: String,
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
