import { mainStore } from '../mobjs';
let scrollY = 0;

/**
 * Get windowScrollY before route change.
 */
mainStore.watch('beforeRouteChange', () => {
    scrollY = window.scrollY;
});

/**
 * Add fixed style and moore to old node.
 */

/**
 * @type {import('../mobjs/type').beforePageTransition}
 */
export const beforePageTransition = async ({ oldNode, oldRoute, newRoute }) => {
    oldNode.style.position = 'fixed';
    oldNode.style.zIndex = 10;
    oldNode.style.transform = `translateY(-${scrollY}px)`;
    // .....
};
