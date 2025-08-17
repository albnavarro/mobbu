//@ts-check

import { MobJs } from '@mobJs';
import { detectFirefox, detectSafari } from '@utils/utils';
import { AsyncTimelineFn } from './async-timeline';
import { AnimationTitle } from '@commonComponent/animation-title/definition';

const buttons = {
    'js-async-timeline-play': {
        label: 'play',
        method: 'play',
    },
    'js-async-timeline-playReverse': {
        label: 'play reverse',
        method: 'playReverse',
    },
    'js-async-timeline-play-label': {
        label: 'play from label',
        method: 'playFromLabel',
    },
    'js-async-timeline-playReverse-label': {
        label: 'play from label reverse',
        method: 'playFromLabelReverse',
    },
    'js-async-timeline-revert-next': {
        label: 'revert next',
        method: 'revertNext',
    },
    'js-async-timeline-pause': {
        label: 'pause',
        method: 'pause',
    },
    'js-async-timeline-resume': {
        label: 'resume',
        method: 'resume',
    },
    'js-async-timeline-stop': {
        label: 'stop',
        method: 'stop',
    },
};

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const AsyncTimeline = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AsyncTimeline>} */
    ({
        tag: 'async-timeline',
        component: AsyncTimelineFn,
        exportState: ['disableOffcanvas'],
        state: {
            isMounted: false,
            disableOffcanvas: () => ({
                value: detectFirefox() || detectSafari() ? true : false,
                type: Boolean,
            }),
            buttons: () => ({
                value: buttons,
                type: 'Any',
            }),
        },
        child: [AnimationTitle],
    })
);
