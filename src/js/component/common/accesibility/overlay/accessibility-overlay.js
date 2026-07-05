import { htmlObject } from '@mobJs';
import { AccessibilityToggle } from '../toggle/definition';
import { setTheme } from '@componentLibs/utils/theme-color';
import { setSiteDirection } from '@componentLibs/utils/site-direction';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent<import('./type').AccessibilityOverlayType>} */
export const AccessibilityOverlayFunction = ({
    bindEffect,
    getSelfProxi,
    setRef,
    staticProps,
}) => {
    const proxi = getSelfProxi();

    const ctas = {
        content: [
            {
                component: AccessibilityToggle,
                modules: staticProps(
                    /** @type {import('../toggle/type').AccessibilityToggleType['props']} */
                    ({
                        className: 'is-accessibility',
                        label: 'theme color:',
                        ariaLabel: 'select theme',
                        options: [
                            {
                                icon: 'sun',
                                id: 'light',
                                ariaLabel: 'light theme',
                                default: true,
                                callback: () => {
                                    setTheme({ theme: 'light' });
                                },
                            },
                            {
                                icon: 'moon',
                                id: 'dark',
                                ariaLabel: 'dark theme',
                                callback: () => {
                                    setTheme({ theme: 'dark' });
                                },
                            },
                        ],
                    })
                ),
            },
            {
                component: AccessibilityToggle,
                modules: staticProps(
                    /** @type {import('../toggle/type').AccessibilityToggleType['props']} */
                    ({
                        className: 'is-accessibility',
                        label: 'text direction:',
                        ariaLabel: 'text direction',
                        options: [
                            {
                                id: 'ltr',
                                text: 'ltr',
                                ariaLabel: 'ltr direction',
                                default: true,
                                callback: () => {
                                    setSiteDirection({ direction: 'ltr' });
                                },
                            },
                            {
                                id: 'rtl',
                                text: 'rtl',
                                ariaLabel: 'rtl direction',
                                callback: () => {
                                    setSiteDirection({ direction: 'rtl' });
                                },
                            },
                        ],
                    })
                ),
            },
        ],
    };

    return htmlObject({
        className: 'c-accessibility-overlay',
        attributes: {
            id: 'accessibility-popover',
            'aria-label': 'Accesibility popover',
            popover: '',
        },
        modules: setRef('dialog'),
        content: [
            {
                className: 'grid',
                modules: bindEffect({
                    toggleClass: {
                        active: () => proxi.active,
                    },
                }),
                content: [
                    {
                        tag: 'button',
                        className: 'close',
                        attributes: {
                            type: 'button',
                            'arial-label': 'Close accessibility popover',
                            popovertarget: 'accessibility-popover',
                            popovertargetaction: 'hide',
                        },
                    },
                    /**
                     * Top header
                     */
                    {
                        className: 'header',
                        attributes: {
                            tabindex: '-1',
                            role: 'region',
                            'aria-label':
                                'Debug Dialog: infos & specific component search',
                        },
                    },
                    ctas,
                ],
            },
        ],
    });
};
