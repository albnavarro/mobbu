//@ts-check

/**
 * @import {MobComponent} from "@mobJsType"
 */

import { htmlObject } from '@mobJs';
import { mobbu2025Scroller } from './animation';

/** @type {MobComponent<import('./type').Mobbu2025>} */
export const Mobbu2025fn = ({ getState, onMount, setRef, getRef }) => {
    const { layer02, layer03 } = getState();

    onMount(() => {
        const { screen, scroller, layer02 } = getRef();

        const { destroy } = mobbu2025Scroller({
            screenElement: screen,
            scrollerElement: scroller,
            layer02,
        });

        return () => {
            destroy();
        };
    });

    return htmlObject({
        className: 'mobbu2025',
        content: {
            className: 'screen',
            modules: setRef('screen'),
            content: {
                className: 'scroller-element',
                modules: setRef('scroller'),
                content: [
                    {
                        className: 'layer',
                        content: layer03,
                    },
                    {
                        className: 'layer',
                        modules: setRef('layer02'),
                        content: layer02,
                    },
                ],
            },
        },
    });
};
