import { MobJs } from '@mobJs';
import { Move3DItemfn } from './move-3d-item';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const Move3DItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Move3DItem>} */
    ({
        tag: 'move-3d-item',
        component: Move3DItemfn,
        props: {
            root: {
                __value: true,
                __type: Boolean,
            },
            depth: {
                __value: 0,
                __type: Number,
            },
            rotate: {
                __value: 'x',
                __type: String,
            },
            width: {
                __value: '0px',
                __type: String,
            },
            height: {
                __value: '0px',
                __type: String,
            },
            offsetX: {
                __value: '0px',
                __type: String,
            },
            offsetY: {
                __value: '0px',
                __type: String,
            },
            range: {
                __value: 20,
                __type: Number,
            },
            anchorPoint: {
                __value: 'center',
                __type: String,
            },
            animate: {
                __value: true,
                __type: Boolean,
            },
            initialRotate: {
                __value: 0,
                __type: Number,
            },
            initialDepth: {
                __value: 0,
                __type: Number,
            },
            classList: {
                __value: '',
                __type: String,
            },
            component: {
                tagName: {
                    __value: '',
                    __type: String,
                },
                className: {
                    __value: '',
                    __type: String,
                },
                props: {
                    __value: '',
                    __type: 'any',
                },
            },
        },
        state: {
            id: {
                __value: '',
                __type: String,
            },
        },
    })
);
