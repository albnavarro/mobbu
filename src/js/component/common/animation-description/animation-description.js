import { html, MobJs } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType';
 */

/** @type {MobComponent<import('./type').AnimationDescription>} */
export const AnimationDescriptionFn = ({ getProxi, bindEffect, onMount }) => {
    const proxi = getProxi();

    onMount(() => {
        /**
         * Component is in fixed position. Avoid visual jump
         */
        const unsubscribeRouteChange = MobJs.beforeRouteChange(() => {
            proxi.visible = false;
        });

        return () => {
            unsubscribeRouteChange();
        };
    });

    return html`<p
        class="animation-description"
        ${bindEffect({
            toggleClass: {
                visible: () => proxi.visible,
            },
        })}
    >
        [ ${proxi.content} ]
    </p>`;
};
