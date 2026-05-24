import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent} */
export const DocContainerFn = () => {
    return htmlObject({
        className: 'c-doc-container',
        content: [
            {
                className: 'left-placeholder',
            },
            {
                tag: 'main',
                content: {
                    tag: 'mobjs-slot',
                    attributes: { name: 'docs' },
                },
            },
            {
                tag: 'aside',
                className: 'right',
                attributes: { 'aria-label': 'right section utils' },
                content: [
                    {
                        tag: 'mobjs-slot',
                        attributes: { name: 'section-title-small' },
                    },
                    {
                        tag: 'mobjs-slot',
                        attributes: { name: 'section-title' },
                    },
                    {
                        tag: 'mobjs-slot',
                        attributes: { name: 'section-links' },
                    },
                ],
            },
        ],
    });
};
