/**
 * @import {MobComponent} from '@mobJsType'
 */

import { outerHeight } from '@mobCoreUtils';
import { htmlObject, MobJs } from '@mobJs';
import { navigationStore } from '@stores/navigation';
import { MobCore } from '@mobCore';
import { getFrameDelay } from '@componentLibs/utils/get-first-animation-delay';
import { scrollToTopNav } from '@layoutComponent/navigation/utils';
import { closeAllNavAccordion } from '@layoutComponent/navigation/navigation/utils';
import { HeaderMainMenu } from './header-main-menu/definition';
import { HeaderUtils } from './header-utils/definition';
import { HeaderToggle } from './nav-toggle/definition';
import { NavigationContainer } from '@layoutComponent/navigation/definition';
import {
    mobNavigationContainerName,
    mobNavigationToggleName,
} from '@instanceName';

function titleHandler() {
    MobJs.loadUrl({ url: 'home' });
    closeAllNavAccordion();
    navigationStore.set('navigationIsOpen', false);
    scrollToTopNav();
}

/** @type {MobComponent<import('./type').Header>} */
export const HeaderFunction = ({
    delegateEvents,
    bindEffect,
    getSelfProxi,
    onMount,
    addMethod,
}) => {
    const proxi = getSelfProxi();

    onMount(({ element }) => {
        addMethod('getHeaderHeight', () => {
            return outerHeight(element);
        });

        addMethod('getHeader', () => {
            return element;
        });

        MobCore.useFrameIndex(() => {
            proxi.isMounted = true;
        }, getFrameDelay());
    });

    const logoContent = {
        className: 'u-has-overflow',
        content: [
            {
                tag: 'h3',
                modules: [
                    bindEffect({
                        toggleClass: {
                            'is-visible': () => proxi.isMounted,
                        },
                    }),
                ],
                content: '<span>Mob</span>Project',
            },
            {
                tag: 'h4',
                modules: bindEffect({
                    toggleClass: {
                        'is-visible': () => proxi.isMounted,
                    },
                }),
                content: 'v 1.0',
            },
        ],
    };

    return htmlObject({
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
                            component: HeaderToggle,
                            instanceName: mobNavigationToggleName,
                        },
                    },
                    {
                        component: NavigationContainer,
                        instanceName: mobNavigationContainerName,
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
                        content: [logoContent],
                    },
                    {
                        tag: 'nav',
                        className: 'menu-cell',
                        attributes: { 'arial-label': 'Main manvigation' },
                        content: {
                            component: HeaderMainMenu,
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
                            component: HeaderUtils,
                        },
                    },
                ],
            },
        ],
    });
};
