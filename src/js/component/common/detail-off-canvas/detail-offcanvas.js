import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent<import('./type').DetailOffcanvasType>} */
export const DetailOffCanvasFunction = ({ setRef }) => {
    return htmlObject({
        className: 'c-detail-offcanvas',
        attributes: {
            id: 'detail-control',
            'aria-label': 'Detail controls',
        },
        content: [
            {
                tag: 'button',
                className: 'open',
                attributes: {
                    type: 'button',
                    popovertarget: 'canvas-control-popover',
                    popovertargetaction: 'show',
                },
                content: [
                    'open detail controls',
                    {
                        tag: 'span',
                        className: 'arrows',
                        content: [
                            {
                                tag: 'span',
                                className: 'arrow-start',
                            },
                            {
                                tag: 'span',
                                className: 'arrow-end',
                            },
                        ],
                    },
                ],
            },
            {
                className: 'pop-over',
                attributes: {
                    id: 'canvas-control-popover',
                    popover: '',
                },
                modules: setRef('dialog'),
                content: {
                    className: 'detail-container',
                    content: [
                        {
                            tag: 'button',
                            className: 'close',
                            attributes: {
                                type: 'button',
                                'aria-label': 'close detail dialog',
                                popovertarget: 'canvas-control-popover',
                                popovertargetaction: 'hide',
                            },
                        },
                        {
                            tag: 'mobjs-slot',
                        },
                    ],
                },
            },
        ],
    });
};
