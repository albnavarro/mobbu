import { fromObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent} */
export const DocContainerFn = () => {
    return fromObject({
        className: 'c-doc-container',
        content: [
            {
                className: 'left',
            },
            {
                className: 'content',
                content: {
                    tag: 'mobjs-slot',
                    attributes: { name: 'docs' },
                },
            },
            {
                className: 'right',
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
