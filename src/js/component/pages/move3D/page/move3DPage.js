//@ts-check

import { setStateByName } from '../../../../mobjs';

/**
 * @import { MobComponent, SetStateByName} from '../../../../mobjs/type';
 * @import { QuickNav } from '../../../common/nextPage/type';
 **/

/** @type {MobComponent<import('./type').Move3DPage>} */
export const Move3DPagefn = ({ onMount, html, bindProps, getState }) => {
    const { prevRoute, nextRoute } = getState();

    onMount(() => {
        /** @type {SetStateByName<QuickNav>} */
        const setQuickNavState = setStateByName('quick_nav');

        /**
         * Quicknav
         */
        setQuickNavState('active', true);
        setQuickNavState('prevRoute', prevRoute);
        setQuickNavState('nextRoute', nextRoute);
        setQuickNavState('color', 'white');

        return () => {
            setQuickNavState('active', false);
            setQuickNavState('prevRoute', '');
            setQuickNavState('nextRoute', '');
            setQuickNavState('color', 'black');
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
