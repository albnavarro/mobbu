/**
 * @import {MobComponent} from "@mobJsType"
 */

import { outerHeight } from '@mobCoreUtils';
import { html, MobJs } from '@mobJs';
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

    return html`
        <header
            class="js-header"
            ${bindEffect({
                toggleClass: {
                    'is-visible': () => proxi.isMounted,
                },
            })}
        >
            <div class="grid">
                <div class="toggle-cell">
                    <mob-header-toggle></mob-header-toggle>
                </div>
                <button
                    class="logo-cell"
                    type="button"
                    ${delegateEvents({
                        click: () => {
                            titleHandler();
                        },
                    })}
                >
                    <div class="u-has-overflow">
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
                <div class="menu-cell">
                    <header-main-menu></header-main-menu>
                </div>
                <div
                    class="utils-cell"
                    ${bindEffect({
                        toggleClass: {
                            'is-visible': () => proxi.isMounted,
                        },
                    })}
                >
                    <mob-header-utils></mob-header-utils>
                </div>
            </div>
        </header>
    `;
};
