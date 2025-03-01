//@ts-check

import { getTrinangle } from '../../../lib/utils/getTriangle';

/**
 * @param {string} tag
 **/
const shouldUseTrinagle = (tag) => {
    return tag === `h1` ? getTrinangle() : '';
};

/** @type {import("../../../../mobjs/type").MobComponent<import("./type").Title>} */
export const TitleFn = ({ html, getState }) => {
    const { tag, color, isBold, classList } = getState();
    const colorClass = `is-${color}`;
    const boldClass = isBold ? `is-bold` : '';

    return html`<${tag} class="mob-title ${colorClass} ${boldClass} ${classList}">
        <span class="triangle-left">${shouldUseTrinagle(tag)}</span>
        <span class="triangle-right">${shouldUseTrinagle(tag)}</span>
            <mobjs-slot></mobjs-slot>
        </${tag}>`;
};
