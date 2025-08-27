/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType';
 * @import {SpacerAnchor} from './type';
 */

import { MobCore } from '@mobCore';
import { html, MobJs } from '@mobJs';
import { isVisibleInViewportSmart } from '@mobCoreUtils';
import { scrollToName } from '../../instance-name';
import { debounceFuncion } from 'src/js/mob/mob-core/events/debounce';

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

    if (isVisibleInViewportSmart(element) && !isSection) {
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

        /**
         * Check if element is visible in viewport at the end of weel with a 500ms debuonce
         */
        const unsubScribeWhell = MobCore.useMouseWheel(
            debounceFuncion(() => {
                if (isVisibleInViewportSmart(element) && !isSection) {
                    /** @type {UseMethodByName<import('../scroll-to/type').ScrollTo>} */
                    const methods = MobJs.useMethodByName(scrollToName);
                    methods?.setActiveLabel?.(label);
                }
            }, 500)
        );

        /**
         * Check if element is visible in viewport at the end of scroll ( no wheel used )
         */
        const unsubScribeScrollEnd = MobCore.useScrollEnd(() => {
            if (isVisibleInViewportSmart(element) && !isSection) {
                /** @type {UseMethodByName<import('../scroll-to/type').ScrollTo>} */
                const methods = MobJs.useMethodByName(scrollToName);
                methods?.setActiveLabel?.(label);
            }
        });

        return () => {
            unsubScribeWhell();
            unsubScribeScrollEnd();
        };
    });

    return html`<div id="${id}" class="spacer spacer--${style} ${lineClass}">
        <span></span>
    </div>`;
};
