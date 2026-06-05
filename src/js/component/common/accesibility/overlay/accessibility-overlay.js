import { htmlObject } from '@mobJs';
import { AccessibilityToggle } from '../toggle/definition';

/**
 * @import {
 *   GetRef,
 *   MobComponent,
 *   ProxiSelfState
 * } from '@mobJsType'
 */

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').AccessibilityOverlayType>} params.proxi
 * @param {GetRef<import('./type').AccessibilityOverlayType>} params.getRef
 */
const closeOverlay = ({ proxi, getRef }) => {
    proxi.active = false;
    getRef().dialog.close();
};

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').AccessibilityOverlayType>} params.proxi
 * @param {GetRef<import('./type').AccessibilityOverlayType>} params.getRef
 */
function backDropHandler({ proxi, getRef }) {
    return function onBackDrop(/** @type {MouseEvent} */ event) {
        if (event.target === getRef().dialog) {
            closeOverlay({ getRef, proxi });
        }
    };
}

/** @type {MobComponent<import('./type').AccessibilityOverlayType>} */
export const AccessibilityOverlayFn = ({
    delegateEvents,
    addMethod,
    bindEffect,
    getSelfProxi,
    onMount,
    setRef,
    getRef,
    staticProps,
}) => {
    const proxi = getSelfProxi();

    addMethod('open', () => {
        proxi.active = true;
        getRef().dialog.showModal();
    });

    onMount(() => {
        const onBackDropSubscriber = backDropHandler({ proxi, getRef });
        getRef().dialog.addEventListener('click', onBackDropSubscriber);

        return () => {
            getRef().dialog.removeEventListener('click', onBackDropSubscriber);
        };
    });

    return htmlObject({
        tag: 'dialog',
        className: 'c-accessibility-overlay',
        attributes: {
            id: 'accessibility-dialog',
            'aria-label': 'Accesibility dialog',
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
                            'arial-label': 'Close debug dialog',
                        },
                        modules: delegateEvents({
                            click: () => {
                                closeOverlay({ proxi, getRef });
                            },
                        }),
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
                    {
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
                                                    console.log('light');
                                                },
                                            },
                                            {
                                                icon: 'moon',
                                                id: 'dark',
                                                ariaLabel: 'dark theme',
                                                callback: () => {
                                                    console.log('dark');
                                                },
                                            },
                                        ],
                                    })
                                ),
                            },
                        ],
                    },
                ],
            },
        ],
    });
};
