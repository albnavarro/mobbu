//@ts-check

import { MobJs } from '@mobJs';
import { detectFirefox, detectSafari } from '@utils/utils';
import { CaterpillarN2Fn } from './caterpillar-n2';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

const duration = 10;

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
        exportState: [
            'numItems',
            'width',
            'height',
            'radius',
            'fill',
            'opacity',
            'xAmplitude',
            'yAmplitude',
            'duration',
            'rotationDefault',
            'friction',
            'disableOffcanvas',
        ],
        state: {
            isMounted: false,
            numItems: 20,
            width: window.innerHeight / 13,
            height: window.innerHeight / 13,
            radius: 0,
            fill: [2],
            opacity: 1,
            xAmplitude: 500,
            yAmplitude: 400,
            duration: 10,
            rotationDefault: 166,
            friction: duration / 2 / Math.PI,
            disableOffcanvas: () => ({
                value: detectFirefox() || detectSafari() ? true : false,
                type: Boolean,
            }),
            buttons: () => ({
                value: buttons,
                type: 'Any',
            }),
        },
    })
);
