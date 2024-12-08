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
 * @import { BindProxi, DelegateEvents, MobComponent, ProxiState, ReturnBindProps } from '../../../../mobjs/type';
 **/

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindProxi} params.bindProxi
 * @param {ProxiState<import('./type').Move3DPage>} params.proxiState
 */
const getControls = ({ delegateEvents, bindProxi, proxiState }) => {
    return html`<div class="c-move3d-page__controls">
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxiState.factor}
                    ${delegateEvents({
                        input: (event) => {
                            // @ts-ignore
                            const value = event?.target?.value ?? 0;
                            proxiState.factor = Number(value);
                        },
                    })}
                />
            </div>
            <div>${bindProxi`factor: ${() => proxiState.factor}`}</div>
        </div>
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
            <div>${bindProxi`xDepth: ${() => proxiState.xDepth}`}</div>
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
            <div>${bindProxi`yDepth: ${() => proxiState.yDepth}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <button
                type="button"
                class="c-move3d-page__controls__button"
                ${delegateEvents({
                    click: () => {
                        proxiState.debug = !proxiState.debug;
                    },
                })}
            >
                Toggle Debug
            </button>
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
    bindProxi,
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
        ${getControls({ delegateEvents, bindProxi, proxiState })}
        <move-3d
            ${bindProps({
                bind: ['data', 'xDepth', 'yDepth', 'factor', 'debug'],
                /** @returns{ReturnBindProps<import('../type').Move3D>} */
                props: () => {
                    return {
                        shape: proxiState.data,
                        xDepth: proxiState.xDepth,
                        yDepth: proxiState.yDepth,
                        factor: proxiState.factor,
                        debug: proxiState.debug,
                    };
                },
            })}
        ></move-3d>
        <move-3d
            ${bindProps({
                bind: ['data', 'xDepth', 'yDepth', 'factor', 'debug'],
                /** @returns{ReturnBindProps<import('../type').Move3D>} */
                props: () => {
                    return {
                        shape: proxiState.data,
                        xDepth: proxiState.xDepth,
                        yDepth: proxiState.yDepth,
                        factor: proxiState.factor,
                        debug: proxiState.debug,
                    };
                },
            })}
        ></move-3d>
    </div>`;
};
