import { htmlObject, MobJs } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').H1Standalone>} */
export const H1StandaloneFunction = ({ getSelfProxi, onMount }) => {
    const proxi = getSelfProxi();

    onMount(({ element }) => {
        /**
         * Prevent component is visible when route is cloned during page-transition.
         */
        const unsubscribeRouteChange = MobJs.beforeRouteChange(() => {
            element.style.display = 'none';
            unsubscribeRouteChange();
        });
    });

    return htmlObject({
        className: 'h1-standalone',
        content: [
            {
                tag: 'span',
                className: 'mask',
            },
            {
                tag: 'h1',
                content: proxi.text,
            },
        ],
    });
};
