//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { SpacerAnchor } from './type';
 **/

import { mobCore } from '../../../mobCore';
import { isVisibleInViewport } from '../../../mobCore/utils';
import { tick, useMethodByName } from '../../../mobjs';

/**
 * @param {object} params
 * @param {string} params.label
 * @return {boolean}
 */
function hasAnchor({ label }) {
    return label?.length > 0;
}

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.label
 * @param {HTMLElement} params.element
 * @return void
 */
const addItemToScrollComponent = async ({ id, label, element }) => {
    await tick();
    useMethodByName('scrollTo')?.addItem({ id, label, element });

    if (isVisibleInViewport(element)) {
        useMethodByName('scrollTo')?.setActiveLabel(label);
    }
};

/** @type {MobComponent<SpacerAnchor>} */
export const SpacerAnchorFn = ({ html, getState, onMount }) => {
    const { style, line, id, label } = getState();
    const lineClass = line ? 'spacer--line' : '';

    onMount(({ element }) => {
        const shouldAddToAnchor = hasAnchor({ label });
        if (!shouldAddToAnchor) return;

        addItemToScrollComponent({ id, label, element });

        const unsubScribeScroll = mobCore.useScrollThrottle(() => {
            if (isVisibleInViewport(element)) {
                useMethodByName('scrollTo')?.setActiveLabel?.(label);
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
