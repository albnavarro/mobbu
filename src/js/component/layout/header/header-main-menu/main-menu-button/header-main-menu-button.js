/**
 * @import {MobComponent} from '@mobJsType'
 * @import {HeaderMainMenuButton} from './type'
 */

import { htmlObject, MobJs } from '@mobJs';
import { navigationStore } from '@stores/navigation';

/** @type {MobComponent<HeaderMainMenuButton>} */
export const HeaderMainMenuButtonFn = ({
    getSelfProxi,
    getBoundedProxi,
    bindEffect,
    computed,
    delegateEvents,
}) => {
    const proxi = getSelfProxi();
    const boundedProxi = getBoundedProxi();

    computed(
        () => proxi.active,
        () => {
            const paths = MobJs.getPagePath({
                hash: boundedProxi.activeRoute.route,
            });

            return paths.some(
                ({ hash: currentHash }) => currentHash === proxi.url
            );
        }
    );

    return htmlObject({
        tag: 'button',
        attributes: { type: 'button', role: 'link' },
        modules: [
            bindEffect({
                toggleClass: { current: () => proxi.active },
                toggleAttribute: {
                    'aria-current': () => {
                        /**
                         * Check id current button hash match to some routes path
                         */
                        const paths = MobJs.getPagePath({
                            hash: boundedProxi.activeRoute.route,
                        });

                        /**
                         * Current route math with one of current path tree
                         */
                        const isMatched = paths.some(
                            ({ hash: currentHash }) => currentHash === proxi.url
                        );

                        /**
                         * No matches with current route
                         */
                        if (!isMatched) return null;

                        /**
                         * Exact page
                         */
                        if (boundedProxi.activeRoute.route === proxi.url)
                            return 'page';

                        /**
                         * Is children page
                         */
                        return 'true';
                    },
                },
            }),
            delegateEvents({
                click: () => {
                    MobJs.loadUrl({ url: proxi.url });
                    navigationStore.set('navigationIsOpen', false);
                },
            }),
        ],
        content: proxi.label,
    });
};
