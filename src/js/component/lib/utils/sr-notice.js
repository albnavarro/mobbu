import { MobCore } from '@mobCore';

const srNoticeElement = document.querySelector('#sr-notice');

/**
 * @param {object} [params]
 * @param {string} [params.text]
 * @param {number} [params.frame]
 * @returns {void}
 */
export const srNotice = ({ text = '', frame = 2 } = {}) => {
    if (!srNoticeElement) return;
    srNoticeElement.textContent = '';

    MobCore.useFrameIndex(() => {
        srNoticeElement.textContent = text;
    }, frame);
};
