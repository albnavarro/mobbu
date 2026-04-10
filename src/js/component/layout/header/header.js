/**
 * @import {MobComponent} from "@mobJsType"
 */

import { outerHeight } from '@mobCoreUtils';
import { fromObject, MobJs } from '@mobJs';
import { navigationStore } from '@stores/navigation';
import { MobCore } from '@mobCore';
import { getFrameDelay } from '@componentLibs/utils/get-first-animation-delay';
import { scrollToTopNav } from '@layoutComponent/navigation/utils';
import { closeAllNavAccordion } from '@layoutComponent/navigation/navigation/utils';

function titleHandler() {
    MobJs.loadUrl({ url: 'home' });
    closeAllNavAccordion();
    navigationStore.set('navigationIsOpen', false);
    scrollToTopNav();
}

/** @type {MobComponent<import('./type').Header>} */
export const HeaderFn = ({
    delegateEvents,
    bindEffect,
    getProxi,
    onMount,
    addMethod,
}) => {
    const proxi = getProxi();

    onMount(({ element }) => {
        addMethod('getHeaderHeight', () => {
            return outerHeight(element);
        });

        MobCore.useFrameIndex(() => {
            proxi.isMounted = true;
        }, getFrameDelay());
    });

    return fromObject({
        tag: 'header',
        className: 'js-header',
        modules: bindEffect({
            toggleClass: {
                'is-visible': () => proxi.isMounted,
            },
        }),
        content: [
            {
                className: 'grid',
                content: [
                    {
                        className: 'toggle-cell',
                        content: {
                            tag: 'mob-header-toggle',
                        },
                    },
                    {
                        tag: 'button',
                        className: 'logo-cell',
                        attributes: { type: 'button' },
                        modules: delegateEvents({
                            click: () => {
                                titleHandler();
                            },
                        }),
                        content: [
                            {
                                className: 'u-has-overflow',
                                content: [
                                    {
                                        tag: 'h3',
                                        modules: [
                                            bindEffect({
                                                toggleClass: {
                                                    'is-visible': () =>
                                                        proxi.isMounted,
                                                },
                                            }),
                                        ],
                                        content: '<span>Mob</span>Project',
                                    },
                                    {
                                        tag: 'h5',
                                        modules: bindEffect({
                                            toggleClass: {
                                                'is-visible': () =>
                                                    proxi.isMounted,
                                            },
                                        }),
                                        content: 'v 1.0',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        className: 'menu-cell',
                        content: {
                            tag: 'header-main-menu',
                        },
                    },
                    {
                        className: 'utils-cell',
                        modules: bindEffect({
                            toggleClass: {
                                'is-visible': () => proxi.isMounted,
                            },
                        }),
                        content: {
                            tag: 'mob-header-utils',
                        },
                    },
                ],
            },
        ],
    });
};
