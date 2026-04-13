/**
 * @import {MobComponent} from "@mobJsType"
 */

import { getIcons } from '@data/index';
import { htmlObject } from '@mobJs';
import { mouseTrailAnimation } from './animation/mouse-trail';

const numberOfStar = 5;

/** @type {MobComponent<import('./type').MouseRotate>} */
export const MouseTrailFn = ({ onMount, getRefs, setRef }) => {
    const { starOutline } = getIcons();
    const stars = [...Array.from({ length: numberOfStar }).keys()].map(() => {
        return htmlObject({
            tag: 'span',
            className: 'child',
            modules: setRef('star'),
            content: starOutline,
        });
    });

    onMount(() => {
        const { star } = getRefs();
        const { destroy } = mouseTrailAnimation({ elements: star });

        return () => {
            destroy();
        };
    });

    return htmlObject({
        className: 'mouse-trail',
        content: stars,
    });
};
