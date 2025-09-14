import { MobJs } from '@mobJs';
import { docsTemplate } from '@pages/index';

/**
 * On site loading animate lines 60 frame after if is not a docs section.
 *
 * @returns {number}
 */
export const getFrameDelay = () => {
    const { templateName } = MobJs.getActiveRoute();
    return docsTemplate.has(templateName) ? 0 : 40;
};
