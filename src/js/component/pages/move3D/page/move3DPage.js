//@ts-check

import {
    resetAnimationTitle,
    updateAnimationTitle,
} from '../../../common/animationTitle/utils';
import {
    resetQuickNavState,
    updateQuickNavState,
} from '../../../common/quickNav/utils';

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../mobjs/type';
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
        <move-3d
            ${bindProps({
                bind: ['data'],
                /** @returns{ReturnBindProps<import('../type').Move3D>} */
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
                /** @returns{ReturnBindProps<import('../type').Move3D>} */
                props: ({ data }) => {
                    return {
                        shape: data,
                    };
                },
            })}
        ></move-3d>
    </div>`;
};
