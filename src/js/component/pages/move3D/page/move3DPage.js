//@ts-check

import {
    resetQuickNavState,
    updateQuickNavState,
} from '../../../common/quickNav/utils';

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').Move3DPage>} */
export const Move3DPagefn = ({ onMount, html, bindProps, getState }) => {
    const { prevRoute, nextRoute } = getState();

    onMount(() => {
        /** Quicknav */
        updateQuickNavState({
            active: true,
            prevRoute,
            nextRoute,
            color: 'white',
        });

        return () => {
            resetQuickNavState();
        };
    });

    return html`<div>
        <move-3d
            ${bindProps({
                bind: ['data'],
                /** @returns{Partial<import('../type').Move3D>} */
                props: ({ data }) => {
                    return {
                        shape: data,
                    };
                },
            })}
        ></move-3d>
        <move-3d
            ${bindProps({
                bind: ['data'],
                /** @returns{Partial<import('../type').Move3D>} */
                props: ({ data }) => {
                    return {
                        shape: data,
                    };
                },
            })}
        ></move-3d>
    </div>`;
};
