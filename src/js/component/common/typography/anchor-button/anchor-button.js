import { offset } from '@mobCoreUtils';
import { fromObject } from '@mobJs';
import { MobBodyScroll } from '@mobMotionPlugin';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {AnchorBUtton} from "./type"
 */

/** @type {MobComponent<AnchorBUtton>} */
export const AnchorButtonFn = ({ getState, delegateEvents }) => {
    const { content: label, anchor } = getState();

    return fromObject({
        content: {
            tag: 'button',
            className: 'anchor-button',
            attributes: { type: 'button' },
            modules: delegateEvents({
                click: () => {
                    const target = document.querySelector(anchor);
                    if (!target) return;

                    // @ts-ignore
                    const offsetTop = offset(target).top - 50;
                    MobBodyScroll.to(offsetTop);
                },
            }),
            content: [
                label,
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
    });
};
