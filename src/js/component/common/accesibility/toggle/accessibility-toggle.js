import { getIcons } from '@data/index';
import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent<import('./type').AccessibilityToggleType>} */
export const AccessibilityToggleFn = ({
    getSelfProxi,
    delegateEvents,
    bindEffect,
}) => {
    const proxi = getSelfProxi();

    /**
     * Get first active id to set initial state.
     */
    const activeOption = proxi.options.find((option) => option.default);
    if (activeOption) proxi.activeId = activeOption.id;

    return htmlObject({
        className: ['c-accessibility-toggle', proxi.className],
        attributes: {},
        content: proxi.options.map((option) => {
            const icon = getIcons()[option?.icon ?? ''];

            return htmlObject({
                className: 'item',
                content: [
                    {
                        tag: 'button',
                        attributes: {
                            type: 'button',
                        },
                        modules: [
                            delegateEvents({
                                click: () => {
                                    proxi.activeId = option.id;
                                    option.callback();
                                },
                            }),
                            bindEffect({
                                toggleClass: {
                                    active: () => proxi.activeId === option.id,
                                },
                            }),
                        ],
                        content: {
                            tag: 'span',
                            className: [
                                'content',
                                option.icon ? 'icon' : 'label',
                            ],
                            content: icon.length > 0 ? icon : option.value,
                        },
                    },
                ],
            });
        }),
    });
};
