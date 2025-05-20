/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType';
 * @import {SpacerAnchor} from './type';
 */

import { MobCore } from '@mobCore';
import { html, MobJs } from '@mobJs';
import { isVisibleInViewport } from '@mobCoreUtils';

/**
 * @param {object} params
 * @param {string} params.label
 * @returns {boolean}
 */
function hasAnchor({ label }) {
    return label?.length > 0;
}

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.label
 * @param {HTMLElement} params.element
 * @returns {Promise<void>}
 */
const addItemToScrollComponent = async ({ id, label, element }) => {
    // Wait that all components is mounted.
    await MobJs.tick();

    /** @type {UseMethodByName<import('../scroll-to/type').ScrollTo>} */
    const methods = MobJs.useMethodByName('scrollTo');
    methods?.addItem?.({ id, label, element });

    if (isVisibleInViewport(element)) {
        methods?.setActiveLabel?.(label);
    }
};

/** @type {MobComponent<SpacerAnchor>} */
export const SpacerAnchorFn = ({ getState, onMount }) => {
    const { style, line, id, label } = getState();
    const lineClass = line ? 'spacer--line' : '';

    onMount(({ element }) => {
        const shouldAddToAnchor = hasAnchor({ label });
        if (!shouldAddToAnchor) return;

        addItemToScrollComponent({ id, label, element });

        const unsubScribeScroll = MobCore.useScrollThrottle(() => {
            if (isVisibleInViewport(element)) {
                /** @type {UseMethodByName<import('../scroll-to/type').ScrollTo>} */
                const methods = MobJs.useMethodByName('scrollTo');
                methods?.setActiveLabel?.(label);
            }
        });

        return () => {
            unsubScribeScroll();
        };
    });

    return html`<div id="${id}" class="spacer spacer--${style} ${lineClass}">
        <span></span>
    </div>`;
};
