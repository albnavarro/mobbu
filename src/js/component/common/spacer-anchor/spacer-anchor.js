/**
 * @import {MobComponent} from "@mobJsType"
 * @import {SpacerAnchor} from "./type"
 */

import { html, MobJs } from '@mobJs';
import { isVisibleInViewportSmart } from '@mobCoreUtils';
import {
    addItemToScrollSideBar,
    setScrollToActiveLabel,
} from '@commonComponent/scroll-to/utils';

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
    addItemToScrollSideBar({ id, label, element, isSection, isNote });

    /**
     * Set initial initial active state.
     *
     * On wheel/scroll active state is performed by scroll-to component in more efficient way
     */
    if (isVisibleInViewportSmart(element) && !isSection) {
        setScrollToActiveLabel(label);
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
    });

    return html`<div id="${id}" class="spacer spacer--${style} ${lineClass}">
        <span></span>
    </div>`;
};
