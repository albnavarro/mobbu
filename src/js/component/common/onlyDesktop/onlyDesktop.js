//@ts-check

/**
 * @import { GetState, MobComponent } from '../../../mobjs/type';
 **/

import { MobCore } from '../../../mobCore';
import { html } from '../../../mobjs';
import { MobMotionCore } from '../../../mobMotion';

/**
 * @param {object} params
 * @param {GetState<import('./type').OnlyDesktop>} params.getState
 */
const getContent = ({ getState }) => {
    const { active } = getState();

    return active
        ? ``
        : html`
              <div class="only-desktop">
                  <h3>This site is available only on desktop</h3>
              </div>
          `;
};

/** @type {MobComponent<import('./type').OnlyDesktop>} */
export const OnlyDesktopFn = ({ onMount, setState, getState, invalidate }) => {
    onMount(() => {
        MobCore.useResize(() => {
            setState(
                'active',
                /** @type {boolean} */ (MobMotionCore.mq('min', 'desktop'))
            );
        });

        return () => {};
    });

    return html`
        <div class="only-desktop-container">
            ${invalidate({
                bind: 'active',
                render: () => {
                    return getContent({ getState });
                },
            })}
        </div>
    `;
};
