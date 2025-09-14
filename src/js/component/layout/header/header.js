/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType';
 */

import { outerHeight } from '@mobCoreUtils';
import { html, MobJs } from '@mobJs';
import {
    mobNavigationContainerName,
    mobNavigationName,
} from '../../instance-name';
import { navigationStore } from '@stores/navigation';
import { MobCore } from '@mobCore';

function titleHandler() {
    MobJs.loadUrl({ url: '#home' });
    navigationStore.set('navigationIsOpen', false);

    /** @type {UseMethodByName<import('../navigation/type').Navigation>} */
    const mainNavigationMethods = MobJs.useMethodByName(mobNavigationName);
    mainNavigationMethods?.closeAllAccordion();

    /** @type {UseMethodByName<import('../navigation/type').NavigationContainer>} */
    const navContainerMethods = MobJs.useMethodByName(
        mobNavigationContainerName
    );
    navContainerMethods?.scrollTop();
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
        }, 10);
    });

    return html`
        <header
            class="l-header"
            ${bindEffect({
                toggleClass: {
                    'is-visible': () => proxi.isMounted,
                },
            })}
        >
            <div class="l-header__container">
                <div class="l-header__grid">
                    <div class="l-header__toggle">
                        <mob-header-toggle></mob-header-toggle>
                    </div>
                    <button
                        type="button"
                        class="l-header__title"
                        ${delegateEvents({
                            click: () => {
                                titleHandler();
                            },
                        })}
                    >
                        <div class="l-header__title-container">
                            <h3
                                ${bindEffect({
                                    toggleClass: {
                                        'is-visible': () => proxi.isMounted,
                                    },
                                })}
                            >
                                <span>Mob</span>Project
                            </h3>
                            <h5
                                ${bindEffect({
                                    toggleClass: {
                                        'is-visible': () => proxi.isMounted,
                                    },
                                })}
                            >
                                v 1.0
                            </h5>
                        </div>
                    </button>
                    <div
                        class="l-header__utils"
                        ${bindEffect({
                            toggleClass: {
                                'is-visible': () => proxi.isMounted,
                            },
                        })}
                    >
                        <mob-header-nav></mob-header-nav>
                    </div>
                </div>
            </div>
        </header>
    `;
};
