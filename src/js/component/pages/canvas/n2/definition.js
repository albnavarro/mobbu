//@ts-check

import { MobJs } from '@mobJs';
import { CaterpillarN2Fn } from './caterpillar-n2';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

const buttons = {
    'js-CN2-play': {
        label: 'play',
        method: 'play',
    },
    'js-CN2-playReverse': {
        label: 'play reverse',
        method: 'playReverse',
    },
    'js-CN2-play-current': {
        label: 'go forward if is backward',
        method: 'playUseCurrent',
    },
    'js-CN2-playReverse-current': {
        label: 'go backward if is forward',
        method: 'playReverseUseCurrent',
    },
    'js-CN2-play-label': {
        label: 'play from label',
        method: 'playFromLabel',
    },
    'js-CN2-playReverse-label': {
        label: 'play from label reverse',
        method: 'plaFromLabelReverse',
    },
    'js-CN2-reverse': {
        label: 'reverse',
        method: 'reverse',
    },
    'js-CN2-stop': {
        label: 'stop',
        method: 'stop',
    },
    'js-CN2-pause': {
        label: 'pause',
        method: 'pause',
    },
    'js-CN2-resume': {
        label: 'resume',
        method: 'resume',
    },
};

export const CaterpillarN2 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').CaterpillarN2>} */
    ({
        tag: 'caterpillar-n2',
        component: CaterpillarN2Fn,
        props: {
            background: () => ({
                value: '',
                type: String,
            }),
            disableOffcanvas: () => ({
                // value: detectFirefox() || detectSafari() ? true : false,
                value: true,
                type: Boolean,
            }),
        },
        state: {
            isMounted: false,
            rotation: () => ({
                value: 166,
                type: Number,
            }),
            rotationlabel: () => ({
                value: 166,
                type: Number,
            }),
            controlsActive: () => ({
                value: false,
                type: Boolean,
            }),
            buttons: () => ({
                value: buttons,
                type: 'Any',
            }),
        },
    })
);
