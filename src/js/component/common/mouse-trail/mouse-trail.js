/**
 * @import {MobComponent} from '@mobJsType';
 */

import { getIcons } from '@data/index';
import { html } from '@mobJs';
import { mouseTrailAnimation } from './animation/mouse-trail';

const numberOfStar = 5;

/** @type {MobComponent<import('./type').MouseRotate>} */
export const MouseTrailFn = ({ onMount, getRefs, setRef }) => {
    const { starOutline } = getIcons();
    const stars = [...Array.from({ length: numberOfStar }).keys()]
        .map(() => {
            return `<span class='mouse-trail__item' ${setRef('star')}>${starOutline}</span>`;
        })
        .join('');

    onMount(() => {
        const { star } = getRefs();
        const { destroy } = mouseTrailAnimation({ elements: star });

        return () => {
            destroy();
        };
    });

    return html`<div class="mouse-trail">${stars}</div>`;
};
