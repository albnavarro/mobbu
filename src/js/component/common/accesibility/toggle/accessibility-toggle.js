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

    return htmlObject({
        className: ['c-accessibility-toggle', proxi.className],
        attributes: {
            role: 'radiogroup',
        },
        content: [
            {
                content: proxi.options.map((option) => {
                    const icon = getIcons()[option?.icon ?? ''];
                    console.log(option);

                    return htmlObject({
                        content: [
                            {
                                tag: 'button',
                                className: option.default ? 'active' : '',
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
                                            active: () =>
                                                proxi.activeId === option.id,
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
                                        icon.length > 0 ? icon : option.value,
                                },
                            },
                        ],
                    });
                }),
            },
        ],
    });
};
