//@ts-check

/**
 * @import { GetState, MobComponent, SetState } from '../../../mobjs/type';
 **/

import { mobCore } from '../../../mobCore';
import { html, tick } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';

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
export const OnlyDesktopFn = ({
    html,
    onMount,
    setState,
    getState,
    invalidate,
}) => {
    onMount(() => {
        mobCore.useResize(() => {
            setState(
                'active',
                /** @type {boolean} */ (motionCore.mq('min', 'desktop'))
            );
        });

        return () => {};
    });

    return html`
        <div class="only-desktop-container">
            ${invalidate({
                bind: 'active',
                persistent: true,
                render: () => {
                    return getContent({ getState });
                },
            })}
        </div>
    `;
};
