import { offset } from '@mobCoreUtils';
import { htmlObject } from '@mobJs';
import { MobBodyScroll } from '@mobMotionPlugin';

/**
 * @import {MobComponent} from '@mobJsType'
 * @import {AnchorBUtton} from './type'
 */

/** @type {MobComponent<AnchorBUtton>} */
export const AnchorButtonFunction = ({ getState, delegateEvents }) => {
    const { content: label, anchor } = getState();

    return htmlObject({
        content: {
            tag: 'button',
            className: 'anchor-button',
            attributes: { type: 'button', role: 'link' },
            modules: delegateEvents({
                click: async () => {
                    const target = document.querySelector(anchor);
                    if (!target) return;

                    // @ts-ignore
                    const offsetTop = offset(target).top - 100;
                    await MobBodyScroll.to(offsetTop, { duration: 10 });

                    /**
                     * Set focus to anchor element
                     */
                    /** @type {HTMLElement} */ (target).focus({
                        preventScroll: true,
                    });
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
