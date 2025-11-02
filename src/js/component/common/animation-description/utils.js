import { MobJs } from '@mobJs';
import { animationDescription } from '../../instance-name';

/**
 * @param {string} content
 */
export const updateAnimationDescription = (content) => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').AnimationDescription>} */
    const methods = MobJs.useMethodByName(animationDescription);
    methods?.updateRawContent?.(content);
};

MobJs.beforeRouteChange(() => {
    updateAnimationDescription('');
});
