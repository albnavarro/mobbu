/**
 * @import {
 *   DelegateEvents,
 *   MobComponent,
 *   StaticProps
 * } from "@mobJsType"
 */

import { fromObject, MobJs } from '@mobJs';
import { getCommonData } from '@data/index';
import { navigationStore } from '@stores/navigation';
import { MobCore } from '@mobCore';

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {StaticProps<import('./main-menu-button/type').HeaderMainMenuButton>} params.staticProps
 */
const getItems = ({ delegateEvents, staticProps }) => {
    const data = getCommonData();

    return data.footer.nav
        .map(({ label, url, section }) => {
            return fromObject({
                tag: 'li',
                content: {
                    tag: 'header-main-menu-button',
                    modules: [
                        delegateEvents({
                            click: () => {
                                MobJs.loadUrl({ url });
                                navigationStore.set('navigationIsOpen', false);
                            },
                        }),
                        staticProps(
                            /** @type {import('./main-menu-button/type').HeaderMainMenuButton['props']} */ ({
                                label,
                                section,
                            })
                        ),
                    ],
                },
            });
        })
        .join('');
};

/** @type {MobComponent} */
export const headerMainMenuFn = ({
    delegateEvents,
    staticProps,
    getProxi,
    onMount,
    bindEffect,
}) => {
    const proxi = getProxi();

    onMount(() => {
        MobCore.useFrameIndex(() => {
            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;

            proxi.isMounted = true;
        }, 10);
    });

    return fromObject({
        tag: 'ul',
        className: 'l-header-menu',
        modules: bindEffect({
            toggleClass: {
                'is-visible': () => proxi.isMounted,
            },
        }),
        content: getItems({ delegateEvents, staticProps }),
    });
};
