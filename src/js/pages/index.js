// @ts-check
import { pageNotFound } from './404';
import { layoutLinksPage } from './layout/layout-links';
import { layoutSidebarAnchor } from './layout/layout-sidebar-anchor';
import { layoutSidebarLinks } from './layout/layout-sidebar-links';
import { layoutAbout } from './about/layout-about';
import { benchMark } from './benchmark';
import { animatedPatternN0 } from './canvas/animated-pattern-n0';
import { animatedPatternN1 } from './canvas/animate-pattern-n1';
import { caterpillarN0 } from './canvas/caterpillar-n0';
import { caterpillarN1 } from './canvas/caterpillar-n1';
import { caterpillarN2 } from './canvas/caterpillar-n2';
import { scrollerN0 } from './canvas/scroller';
import { scrollerN1 } from './canvas/scroller-n1';
import { dynamic_list } from './dynamic-list';
import { home } from './home';
import { matrioska_page } from './matrioska';
import { horizontalScroller } from './plugin/horizontal-scroller';
import { move3DRoute } from './plugin/move-3d';
import { move3DrouteProps } from './plugin/move-3d/props';
import { lettering01 } from './svg/lettering-01';

export const PAGE_TEMPLATE_COMPONENT_MOBJS = 'templateMobJsComponent';
export const PAGE_TEMPLATE_TRAVERSAL_MOBJS = 'templateMobJsTraversal';

const mobJsComponentBreadCrumbs = [
    {
        url: './#mobJs-overview',
        title: 'mobJs',
    },
    {
        url: './#mobJs-component',
        title: 'component',
    },
];

const mobJsOverviewBreadCrumbs = [
    {
        url: './#mobJs-overview',
        title: 'mobJs',
    },
];

const mobCoreOverviewBreadCrumbs = [
    {
        url: './#mobCore-overview',
        title: 'mobCore',
    },
];

const mobMotionOverviewBreadCrumbs = [
    {
        url: './#mobMotion-overview',
        title: 'mobMotion',
    },
];

/**
 * @type {import('@mobJsType').Route[]}
 */
export const routes = [
    {
        name: 'pageNotFound',
        layout: pageNotFound,
        props: {},
    },
    {
        name: 'about',
        layout: layoutAbout,
        props: {},
    },
    {
        name: 'animatedPatternN0',
        layout: animatedPatternN0,
        props: {},
    },
    {
        name: 'animatedPatternN1',
        layout: animatedPatternN1,
        props: {},
    },
    {
        name: 'caterpillarN0',
        layout: caterpillarN0,
        props: {},
    },
    {
        name: 'caterpillarN1',
        layout: caterpillarN1,
        props: {},
    },
    {
        name: 'caterpillarN2',
        layout: caterpillarN2,
        props: {},
    },
    {
        name: 'canvas-overview',
        layout: layoutLinksPage,
        props: {
            source: './data/canvas/data.json',
        },
    },
    {
        name: 'scrollerN0',
        layout: scrollerN0,
        props: {},
    },
    {
        name: 'scrollerN1',
        layout: scrollerN1,
        props: {},
    },
    {
        name: 'dynamic-list',
        layout: dynamic_list,
        props: {},
    },
    {
        name: 'matrioska',
        layout: matrioska_page,
        props: {},
    },
    {
        name: 'home',
        layout: home,
        props: {},
    },
    {
        name: 'mobCore-overview',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-core/overview.json',
            title: 'mobCore',
            breadCrumbs: [],
        },
    },
    {
        name: 'mobCore-defaults',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-core/defaults.json',
            title: 'Defaults',
            breadCrumbs: mobCoreOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobCore-events',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-core/events.json',
            title: 'Events',
            breadCrumbs: mobCoreOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobCore-store',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-core/store.json',
            title: 'Store',
            breadCrumbs: mobCoreOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-overview',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-js/overview.json',
            title: 'mobJs',
            breadCrumbs: [],
        },
    },
    {
        name: 'mobJs-initialization',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-js/initialization.json',
            title: 'initialization',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-component',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-js/component.json',
            title: 'component',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-web-component',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-js/webComponent.json',
            title: 'webComponent',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-routing',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-js/routing.json',
            title: 'routing',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-useMethodByName',
        templateName: PAGE_TEMPLATE_TRAVERSAL_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/useMethodByName.json',
            title: 'useMethodByName',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-useMethodArrayByName',
        templateName: PAGE_TEMPLATE_TRAVERSAL_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/useMethodArrayByName.json',
            title: 'useMethodArrayByName',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-setStateByName',
        templateName: PAGE_TEMPLATE_TRAVERSAL_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/setStateByName.json',
            title: 'setStateByName',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-updateStateByName',
        templateName: PAGE_TEMPLATE_TRAVERSAL_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/updateStateByName.json',
            title: 'updateStateByName',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-debug-component',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/real-world/debug-component.json',
            title: 'Debug component',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-benchmark-invalidate',
        layout: benchMark,
        props: {
            rootComponent: 'benchmark-invalidate',
        },
    },
    {
        name: 'mobJs-benchmark-repeat-no-key',
        layout: benchMark,
        props: {
            rootComponent: 'benchmark-repeat-no-key',
        },
    },
    {
        name: 'mobJs-benchmark-repeat-key',
        layout: benchMark,
        props: {
            rootComponent: 'benchmark-repeat-key',
        },
    },
    {
        name: 'mobJs-benchmark-repeat-no-key-nested',
        layout: benchMark,
        props: {
            rootComponent: 'benchmark-repeat-key-no-nested',
        },
    },
    {
        name: 'mobJs-benchmark-repeat-key-nested',
        layout: benchMark,
        props: {
            rootComponent: 'benchmark-repeat-key-nested',
        },
    },
    {
        name: 'mobJs-benchmark-repeat-key-bind-store',
        layout: benchMark,
        props: {
            rootComponent: 'benchmark-repeat-no-key-bind-store',
        },
    },
    {
        name: 'mobJs-tick',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-js/tick.json',
            title: 'tick',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-utils',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-js/utils.json',
            title: 'utils',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-debug',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-js/debug.json',
            title: 'debug',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-onMount',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/onMount.json',
            title: 'onMount',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-getState',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/getState.json',
            title: 'getState',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-setState',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/setState.json',
            title: 'setState',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-updateState',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/updateState.json',
            title: 'updateState',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-getProxi',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/getProxi.json',
            title: 'getProxi',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-watch',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/watch.json',
            title: 'watch',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-staticProps',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/staticProps.json',
            title: 'staticProps',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindProps',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/bindProps.json',
            title: 'bindProps',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindEvents',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/bindEvents.json',
            title: 'bindEvents',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-delegateEvents',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/delegateEvents.json',
            title: 'delegateEvents',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindStore',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/bindStore.json',
            title: 'bindStore',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindtext',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/bindText.json',
            title: 'bindText',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindObject',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/bindObject.json',
            title: 'bindObject',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bind-effect',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/bindEffect.json',
            title: 'bindEffect',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-methods',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/methods.json',
            title: 'methods',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-refs',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/refs.json',
            title: 'refs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-runtime',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/runtime.json',
            title: 'runtime',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-repeat',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/repeat.json',
            title: 'repeat',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-invalidate',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/invalidate.json',
            title: 'repeat',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-invalidate-vs-repeater',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/invalidate-vs-repeater.json',
            title: 'repeat',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-unBind',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/unBind.json',
            title: 'unBind',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-emit',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/emit.json',
            title: 'emit',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-emitAsync',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/emitAsync.json',
            title: 'emitAsync',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-computed',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/computed.json',
            title: 'computed',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-renderComponent',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/renderDom.json',
            title: 'renderDom',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-removeDom',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/removeDom.json',
            title: 'removeDom',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-remove',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/remove.json',
            title: 'remove',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-getChildren',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/getChildren.json',
            title: 'getChildren',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-freezeProp',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/freezeProp.json',
            title: 'freezeProp',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-unFreezeProp',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/unFreezeProp.json',
            title: 'unFreezeProp',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-getParentId',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/getParentId.json',
            title: 'getParentId',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-watchParent',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/watchParent.json',
            title: 'watchParent',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-instanceName',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/instanceName.json',
            title: 'instanceName',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-class-list',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/classList.json',
            title: 'classList',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-slot',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/slot.json',
            title: 'slot',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-stagger',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-motion/stagger.json',
            title: 'Stagger',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-defaults',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-motion/defaults.json',
            title: 'Defaults',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-overview',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-motion/overview.json',
            title: 'mobMotion',
            breadCrumbs: [],
        },
    },
    {
        name: 'mobMotion-parallax',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-motion/parallax.json',
            title: 'Parallax',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-sequencer',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-motion/sequencer.json',
            title: 'Sequencer',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-scrolltrigger',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-motion/scrollTrigger.json',
            title: 'ScrollTrigger',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-sync-timeline',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-motion/syncTimeline.json',
            title: 'Sync timeline',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-create-stagger',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-motion/createStagger.json',
            title: 'CreateStagger',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-async-timeline',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-motion/asyncTimeline.json',
            title: 'Async timeline',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-tween-spring-lerp',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mob-motion/tweenSpringLerp.json',
            title: 'Tween Spring Lerp',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'horizontalScroller',
        templateName: 'generic',
        layout: horizontalScroller,
        restoreScroll: false,
        props: {},
    },
    {
        name: 'plugin-overview',
        layout: layoutLinksPage,
        props: {
            source: './data/plugin/data.json',
        },
    },
    {
        name: 'move3D-shape1',
        templateName: 'generic',
        layout: move3DRoute,
        props: move3DrouteProps.shape1,
    },
    {
        name: 'svg-overview',
        layout: layoutLinksPage,
        props: {
            source: './data/svg/data.json',
        },
    },
    {
        name: 'lettering01',
        layout: lettering01,
        props: {},
    },
];
