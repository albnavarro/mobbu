import { MobJs } from '@mobJs';
import { MobTimeline, MobTween } from '@mobMotion';
import {
    PAGE_TEMPLATE_ABOUT,
    PAGE_TEMPLATE_COMPONENT_MOBJS,
    PAGE_TEMPLATE_DOCS_DEFAULT,
    PAGE_TEMPLATE_HOME,
    PAGE_TEMPLATE_LINKS,
} from '../pages';

let scrollY = 0;

MobJs.beforeRouteChange(() => {
    scrollY = window.scrollY;
});

const useTopPosition = new Set([
    PAGE_TEMPLATE_COMPONENT_MOBJS,
    PAGE_TEMPLATE_DOCS_DEFAULT,
    PAGE_TEMPLATE_LINKS,
    PAGE_TEMPLATE_ABOUT,
]);

const useLetPosition = new Set([
    PAGE_TEMPLATE_COMPONENT_MOBJS,
    PAGE_TEMPLATE_DOCS_DEFAULT,
    PAGE_TEMPLATE_LINKS,
    PAGE_TEMPLATE_ABOUT,
    PAGE_TEMPLATE_HOME,
]);

/**
 * @type {import('@mobJsType').BeforePageTransition}
 */
export const beforePageTransition = async ({ oldNode, oldTemplateName }) => {
    oldNode.classList.remove('current-route');
    oldNode.classList.add('fake-content');
    oldNode.style.position = 'fixed';
    oldNode.style.zIndex = '10';
    oldNode.style.top = useTopPosition.has(oldTemplateName)
        ? 'var(--header-height)'
        : '0';
    oldNode.style.left = useLetPosition.has(oldTemplateName)
        ? `calc(var(--header-height)/2)`
        : '0';
    oldNode.style.right = `0`;
    oldNode.style.transform = `translateY(-${scrollY}px)`;
    oldNode.style.minHeight =
        'calc(100vh - var(--header-height) - var(--footer-height))';
};

/**
 * @type {import('@mobJsType').PageTransition}
 */
export const pageTransition = async ({
    oldNode,
    newNode,
    oldRoute,
    newRoute,
}) => {
    if (oldRoute === newRoute) return;

    /** @type {HTMLElement} */ (newNode).style.opacity = '0';

    const oldNodeTween = MobTween.createTimeTween({
        data: { opacity: 1 },
        duration: 200,
    });

    const newNodeTween = MobTween.createTimeTween({
        data: { opacity: 0 },
        duration: 300,
    });

    oldNodeTween.subscribe(({ opacity }) => {
        /** @type {HTMLElement} */ (oldNode).style.opacity = opacity;
    });

    newNodeTween.subscribe(({ opacity }) => {
        /** @type {HTMLElement} */ (newNode).style.opacity = opacity;
    });

    let tl = MobTimeline.createAsyncTimeline({ repeat: 1 })
        .createGroup({ waitComplete: true })
        .goTo(oldNodeTween, { opacity: 0 })
        .goTo(newNodeTween, { opacity: 1 })
        .closeGroup();

    await tl.play();

    tl.destroy();
    // @ts-ignore
    tl = null;

    /** @type {HTMLElement} */ (newNode).style.removeProperty('opacity');
    /** @type {HTMLElement} */ (newNode).classList.add('current-route');
};
