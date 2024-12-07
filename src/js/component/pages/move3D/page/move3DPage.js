//@ts-check

import { html } from '../../../../mobjs';
import {
    resetAnimationTitle,
    updateAnimationTitle,
} from '../../../common/animationTitle/utils';
import {
    resetQuickNavState,
    updateQuickNavState,
} from '../../../common/quickNav/utils';

/**
 * @import { Bindtext, DelegateEvents, MobComponent, ProxiState, ReturnBindProps } from '../../../../mobjs/type';
 **/

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {Bindtext} params.bindText
 * @param {ProxiState<import('./type').Move3DPage>} params.proxiState
 */
const getControls = ({ delegateEvents, bindText, proxiState }) => {
    return html`<div class="c-move3d-page__controls">
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxiState.xDepth}
                    ${delegateEvents({
                        input: (event) => {
                            // @ts-ignore
                            const value = event?.target?.value ?? 0;
                            proxiState.xDepth = Number(value);
                        },
                    })}
                />
            </div>
            <div>${bindText`xDepth: ${'xDepth'}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxiState.xLimit}
                    ${delegateEvents({
                        input: (event) => {
                            // @ts-ignore
                            const value = event?.target?.value ?? 0;
                            proxiState.xLimit = Number(value);
                        },
                    })}
                />
            </div>
            <div>${bindText`xLimit: ${'xLimit'}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxiState.yDepth}
                    ${delegateEvents({
                        input: (event) => {
                            // @ts-ignore
                            const value = event?.target?.value ?? 0;
                            proxiState.yDepth = Number(value);
                        },
                    })}
                />
            </div>
            <div>${bindText`yDepth: ${'yDepth'}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxiState.yLimit}
                    ${delegateEvents({
                        input: (event) => {
                            // @ts-ignore
                            const value = event?.target?.value ?? 0;
                            proxiState.yLimit = Number(value);
                        },
                    })}
                />
            </div>
            <div>${bindText`yLimit: ${'yLimit'}`}</div>
        </div>
    </div>`;
};

/** @type {MobComponent<import('./type').Move3DPage>} */
export const Move3DPagefn = ({
    onMount,
    html,
    bindProps,
    getState,
    delegateEvents,
    bindText,
    getProxi,
}) => {
    const { prevRoute, nextRoute } = getState();
    const proxiState = getProxi();

    onMount(() => {
        /** Quicknav */
        updateQuickNavState({
            active: true,
            prevRoute,
            nextRoute,
            color: 'white',
        });

        /** Title */
        updateAnimationTitle({
            align: 'left',
            title: 'Move3D',
            color: 'black',
        });

        return () => {
            resetQuickNavState();
            resetAnimationTitle();
        };
    });

    return html`<div>
        ${getControls({ delegateEvents, bindText, proxiState })}
        <move-3d
            ${bindProps({
                bind: ['data', 'xDepth', 'xLimit', 'yDepth', 'yLimit'],
                /** @returns{ReturnBindProps<import('../type').Move3D>} */
                props: () => {
                    return {
                        shape: proxiState.data,
                        xDepth: proxiState.xDepth,
                        xLimit: proxiState.xLimit,
                        yDepth: proxiState.yDepth,
                        yLimit: proxiState.yLimit,
                    };
                },
            })}
        ></move-3d>
        <move-3d
            ${bindProps({
                bind: ['data', 'xDepth', 'xLimit', 'yDepth', 'yLimit'],
                /** @returns{ReturnBindProps<import('../type').Move3D>} */
                props: () => {
                    return {
                        shape: proxiState.data,
                        xDepth: proxiState.xDepth,
                        xLimit: proxiState.xLimit,
                        yDepth: proxiState.yDepth,
                        yLimit: proxiState.yLimit,
                    };
                },
            })}
        ></move-3d>
    </div>`;
};
