import { getIcons } from '@data/index';
import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent<import('./type').AccessibilityToggleType>} */
export const AccessibilityToggleFunction = ({
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
        content: {
            className: 'grid',
            content: [
                {
                    tag: 'p',
                    content: proxi.label,
                },
                {
                    className: 'cta-group',
                    attributes: {
                        role: 'group',
                        'aria-label': proxi.ariaLabel,
                    },
                    content: proxi.options.map((option) => {
                        const icon = getIcons()[option?.icon ?? ''];

                        return htmlObject({
                            className: 'item',
                            content: [
                                {
                                    tag: 'button',
                                    attributes: {
                                        type: 'button',
                                        'aria-label': option.ariaLabel,
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
                                                active: () =>
                                                    proxi.activeId ===
                                                    option.id,
                                            },
                                            toggleAttribute: {
                                                'aria-pressed': () =>
                                                    proxi.activeId === option.id
                                                        ? 'true'
                                                        : 'false',
                                            },
                                        }),
                                    ],
                                    content: {
                                        tag: 'span',
                                        className: [
                                            'content',
                                            option.icon ? 'icon' : 'label',
                                        ],
                                        content:
                                            icon?.length > 0
                                                ? icon
                                                : option.text,
                                    },
                                },
                            ],
                        });
                    }),
                },
            ],
        },
    });
};
