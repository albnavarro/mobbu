import { MobJs } from '@mobJs';
import { animationDescription } from '../../instance-name';

/**
 * @param {string} content
 */
export const updateAnimationDescription = (content) => {
    /** @type {import('@mobJsType').UpdateState<import('./type').AnimationDescription>} */
    const updateState = MobJs.updateStateByName(animationDescription);
    updateState('rawContent', () => content);
};

MobJs.beforeRouteChange(() => {
    /** @type {import('@mobJsType').UpdateState<import('./type').AnimationDescription>} */
    const updateState = MobJs.updateStateByName(animationDescription);
    updateState('rawContent', () => '');
});
