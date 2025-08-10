/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType';
 * @import {SpacerAnchor} from './type';
 */

import { MobCore } from '@mobCore';
import { html, MobJs } from '@mobJs';
import { isVisibleInViewport } from '@mobCoreUtils';
import { scrollToName } from '../../instance-name';

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
 * @param {boolean} params.isSection
 * @param {boolean} params.isNote
 * @returns {Promise<void>}
 */
const addItemToScrollComponent = async ({
    id,
    label,
    element,
    isSection,
    isNote,
}) => {
    // Wait that all components is mounted.
    await MobJs.tick();

    /** @type {UseMethodByName<import('../scroll-to/type').ScrollTo>} */
    const methods = MobJs.useMethodByName(scrollToName);
    methods?.addItem?.({ id, label, element, isSection, isNote });

    if (isVisibleInViewport(element) && !isSection) {
        methods?.setActiveLabel?.(label);
    }
};

/** @type {MobComponent<SpacerAnchor>} */
export const SpacerAnchorFn = ({ getState, onMount }) => {
    const { style, line, id, label, isSection, isNote } = getState();
    const lineClass = line ? 'spacer--line' : '';

    onMount(({ element }) => {
        const shouldAddToAnchor = hasAnchor({ label });
        if (!shouldAddToAnchor) return;

        addItemToScrollComponent({ id, label, element, isSection, isNote });

        const unsubScribeScroll = MobCore.useScrollThrottle(() => {
            if (isVisibleInViewport(element) && !isSection) {
                /** @type {UseMethodByName<import('../scroll-to/type').ScrollTo>} */
                const methods = MobJs.useMethodByName(scrollToName);
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
