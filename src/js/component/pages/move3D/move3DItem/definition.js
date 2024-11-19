//@ts-check

import { createComponent } from '../../../../mobjs';
import { StarSvg } from '../../../common/SvgShape/Star/definition';
import { Move3DItemfn } from './Move3DItem';

export const Move3DItem = createComponent({
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
            value: '',
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
    child: [StarSvg],
});
