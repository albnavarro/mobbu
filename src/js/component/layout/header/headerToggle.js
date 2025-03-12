//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

import { html } from '../../../mobjs';
import { navigationStore } from '../navigation/store/navStore';

/** @type {MobComponent<import('./type').HeaderToggle>} */
export const HeaderToggleFn = ({
    delegateEvents,
    setState,
    getState,
    bindEffect,
}) => {
    navigationStore.watch('navigationIsOpen', (val) => {
        setState('isOpen', val);
    });

    return html`
        <button
            class="hamburger hamburger--squeeze"
            type="button"
            ${delegateEvents({
                click: () => {
                    navigationStore.update(
                        'navigationIsOpen',
                        (state) => !state
                    );
                },
            })}
            ${bindEffect({
                bind: 'isOpen',
                toggleClass: {
                    'is-open': () => getState().isOpen,
                },
            })}
        >
            <div class="hamburger-box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `;
};
