/**
 * @import {
 *   MobComponent,
 *   StaticProps
 * } from '@mobJsType'
 */

import { htmlObject } from '@mobJs';
import { getCommonData } from '@data/index';
import { MobCore } from '@mobCore';
import { HeaderMainMenuButton } from './main-menu-button/definition';

/**
 * @param {object} params
 * @param {StaticProps<import('./main-menu-button/type').HeaderMainMenuButton>} params.staticProps
 */
const getItems = ({ staticProps }) => {
    const data = getCommonData();

    return data.footer.nav.map(({ label, url, section }) => {
        return htmlObject({
            tag: 'li',
            content: {
                component: HeaderMainMenuButton,
                modules: [
                    staticProps(
                        /** @type {import('./main-menu-button/type').HeaderMainMenuButton['props']} */ ({
                            label,
                            section,
                            url,
                        })
                    ),
                ],
            },
        });
    });
};

/** @type {MobComponent} */
export const HeaderMainMenuFunction = ({
    staticProps,
    getSelfProxi,
    onMount,
    bindEffect,
}) => {
    const proxi = getSelfProxi();

    onMount(() => {
        MobCore.useFrameIndex(() => {
            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;

            proxi.isMounted = true;
        }, 10);
    });

    return htmlObject({
        tag: 'ul',
        className: 'l-header-menu',
        modules: bindEffect({
            toggleClass: {
                'is-visible': () => proxi.isMounted,
            },
        }),
        content: getItems({ staticProps }),
    });
};
