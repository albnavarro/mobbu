import { html, MobJs } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType';
 */

/** @type {MobComponent<import('./type').AnimationDescription>} */
export const AnimationDescriptionFn = ({
    getProxi,
    bindEffect,
    bindText,
    watch,
}) => {
    const proxi = getProxi();

    /**
     * Remove content after css animation.
     *
     * - Use sideEffect for synchronize css animation && content text.
     * - Avoid to see [ ] clear when content is clear.
     */
    watch(
        () => proxi.rawContent,
        (value) => {
            const hasValue = value.length > 0;

            /**
             * Animation out
             *
             * - First animation then remove content.
             */
            if (!hasValue) {
                proxi.visible = false;

                setTimeout(() => {
                    proxi.content = '';
                }, 350);

                return;
            }

            /**
             * Animation in
             *
             * - Animation && content is same time
             */
            setTimeout(() => {
                proxi.content = `[ ${value} ]`;
                if (hasValue) proxi.visible = true;
            }, 350);
        },
        { immediate: true }
    );

    MobJs.beforeRouteChange(() => {
        proxi.rawContent = '';
    });

    return html`<p
        class="animation-description"
        ${bindEffect({
            toggleClass: {
                visible: () => proxi.visible,
            },
        })}
    >
        ${bindText`${'content'}`}
    </p>`;
};
