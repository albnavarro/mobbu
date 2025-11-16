import { animationDescription } from '@instanceName';
import { MobJs } from '@mobJs';

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
