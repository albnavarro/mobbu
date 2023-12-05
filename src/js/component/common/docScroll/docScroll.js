import { mobCore } from '../../../mobCore';
import { motionCore } from '../../../mobMotion';

const setProperty = ({ scrollY, element }) => {
    mobCore.useNextTick(() => {
        const scrollValue = scrollY;
        const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        const delta = Math.round((scrollValue / scrollHeight) * 100);

        mobCore.useNextFrame(() => {
            element.style.setProperty('--delta', `${delta}%`);
        });
    });
};

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const DocScroll = ({ html, onMount }) => {
    onMount(({ element }) => {
        if (motionCore.mq('max', 'large')) return;

        element.style.setProperty('--delta', `0`);

        const unsubscribeScroll = mobCore.useScroll(({ scrollY }) => {
            mobCore.useFrame(() => {
                setProperty({ scrollY, element });
            });
        });

        return () => {
            unsubscribeScroll();
        };
    });
    return html` <div class="c-doc-scroll"></div> `;
};
