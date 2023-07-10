import { createComponentDefinition } from '../../../../mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { CaterpillarN2 } from './caterpillarN2';

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

export const caterpillarN2Def = createComponentDefinition({
    name: 'Caterpillarn2',
    component: CaterpillarN2,
    props: {
        numItems: 30,
        width: 60,
        height: 60,
        radius: 20,
        fill: [2, 10],
        opacity: 0.02,
        xAmplitude: 500,
        yAmplitude: 400,
        duration: 10,
        rotationDefault: 360,
        friction: duration / 2 / Math.PI,
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
        buttons,
    },
    state: {
        numItems: 30,
        width: 60,
        height: 60,
        radius: 20,
        fill: [2, 10],
        opacity: 0.02,
        xAmplitude: 500,
        yAmplitude: 400,
        duration: 10,
        rotationDefault: 360,
        friction: duration / 2 / Math.PI,
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
        buttons: () => ({
            value: buttons,
            type: 'Any',
        }),
    },
});
