//@ts-check

import { html } from '../../../../mob/mobjs';
import { getTrinangle } from '../../../lib/utils/getTriangle';

/**
 * @param {string} tag
 **/
const shouldUseTrinagle = (tag) => {
    return tag === `h1` ? getTrinangle() : '';
};

/** @type {import("../../../../mob/mobjs/type").MobComponent<import("./type").Title>} */
export const TitleFn = ({ getState }) => {
    const { tag, color, isBold } = getState();
    const colorClass = `is-${color}`;
    const boldClass = isBold ? `is-bold` : '';

    return html`<${tag} class="mob-title ${colorClass} ${boldClass}">
        <span class="triangle-left">${shouldUseTrinagle(tag)}</span>
        <span class="triangle-right">${shouldUseTrinagle(tag)}</span>
            <mobjs-slot></mobjs-slot>
        </${tag}>`;
};
