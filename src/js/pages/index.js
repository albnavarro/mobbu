// @ts-check
import { pageNotFound } from './404';
import { layoutLinksPage } from './Layout/layoutLinks';
import { layoutSidebarAnchor } from './Layout/layoutSidebarAnchor';
import { layoutSidebarLinks } from './Layout/layoutSidebarLinks';
import { layoutAbout } from './about/layoutAbout';
import { benchMark } from './benchmark';
import { animatedPatternN0 } from './canvas/animatedPatternN0';
import { animatedPatternN1 } from './canvas/animatedPatternN1';
import { caterpillarN0 } from './canvas/caterpillarN0';
import { caterpillarN1 } from './canvas/caterpillarN1';
import { caterpillarN2 } from './canvas/caterpillarN2';
import { scrollerN0 } from './canvas/scroller';
import { scrollerN1 } from './canvas/scrollerN1';
import { dynamic_list } from './dynamicList';
import { home } from './home';
import { matrioska_page } from './matrioska';
import { horizontalScroller } from './plugin/horizontalScroller';
import { move3DRoute } from './plugin/move3D';
import { move3DrouteProps } from './plugin/move3D/props';
import { lettering01 } from './svg/lettering01';

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
            source: './data/mobCore/overview.json',
            title: 'mobCore',
            breadCrumbs: [],
        },
    },
    {
        name: 'mobCore-defaults',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobCore/defaults.json',
            title: 'Defaults',
            breadCrumbs: mobCoreOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobCore-events',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobCore/events.json',
            title: 'Events',
            breadCrumbs: mobCoreOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobCore-store',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobCore/store.json',
            title: 'Store',
            breadCrumbs: mobCoreOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-overview',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/overview.json',
            title: 'mobJs',
            breadCrumbs: [],
        },
    },
    {
        name: 'mobJs-initialization',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/initialization.json',
            title: 'initialization',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-component',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/component.json',
            title: 'component',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-web-component',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/webComponent.json',
            title: 'webComponent',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-routing',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/routing.json',
            title: 'routing',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-useMethodByName',
        templateName: PAGE_TEMPLATE_TRAVERSAL_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/useMethodByName.json',
            title: 'useMethodByName',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-useMethodArrayByName',
        templateName: PAGE_TEMPLATE_TRAVERSAL_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/useMethodArrayByName.json',
            title: 'useMethodArrayByName',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-setStateByName',
        templateName: PAGE_TEMPLATE_TRAVERSAL_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/setStateByName.json',
            title: 'setStateByName',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-updateStateByName',
        templateName: PAGE_TEMPLATE_TRAVERSAL_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/updateStateByName.json',
            title: 'updateStateByName',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-debug-component',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/realWorld/debug-component.json',
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
            source: './data/mobJs/tick.json',
            title: 'tick',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-utils',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/utils.json',
            title: 'utils',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-debug',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/debug.json',
            title: 'debug',
            breadCrumbs: mobJsOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobJs-onMount',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/onMount.json',
            title: 'onMount',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-getState',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/getState.json',
            title: 'getState',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-setState',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/setState.json',
            title: 'setState',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-updateState',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/updateState.json',
            title: 'updateState',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-getProxi',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/getProxi.json',
            title: 'getProxi',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-watch',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/watch.json',
            title: 'watch',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-staticProps',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/staticProps.json',
            title: 'staticProps',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindProps',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/bindProps.json',
            title: 'bindProps',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindEvents',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/bindEvents.json',
            title: 'bindEvents',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-delegateEvents',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/delegateEvents.json',
            title: 'delegateEvents',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindStore',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/bindStore.json',
            title: 'bindStore',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindtext',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/bindText.json',
            title: 'bindText',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindObject',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/bindObject.json',
            title: 'bindObject',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bind-effect',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/bindEffect.json',
            title: 'bindEffect',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-methods',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/methods.json',
            title: 'methods',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-refs',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/refs.json',
            title: 'refs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-runtime',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/runtime.json',
            title: 'runtime',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-repeat',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/repeat.json',
            title: 'repeat',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-invalidate',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/invalidate.json',
            title: 'repeat',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-invalidate-vs-repeater',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/invalidate-vs-repeater.json',
            title: 'repeat',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-unBind',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/unBind.json',
            title: 'unBind',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-emit',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/emit.json',
            title: 'emit',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-emitAsync',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/emitAsync.json',
            title: 'emitAsync',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-computed',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/computed.json',
            title: 'computed',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-renderComponent',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/renderDom.json',
            title: 'renderDom',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-removeDom',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/removeDom.json',
            title: 'removeDom',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-remove',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/remove.json',
            title: 'remove',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-getChildren',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/getChildren.json',
            title: 'getChildren',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-freezeProp',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/freezeProp.json',
            title: 'freezeProp',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-unFreezeProp',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/unFreezeProp.json',
            title: 'unFreezeProp',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-getParentId',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/getParentId.json',
            title: 'getParentId',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-watchParent',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/watchParent.json',
            title: 'watchParent',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-instanceName',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/instanceName.json',
            title: 'instanceName',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-class-list',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/classList.json',
            title: 'classList',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-slot',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/slot.json',
            title: 'slot',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-stagger',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/stagger.json',
            title: 'Stagger',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-defaults',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/defaults.json',
            title: 'Defaults',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-overview',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/overview.json',
            title: 'mobMotion',
            breadCrumbs: [],
        },
    },
    {
        name: 'mobMotion-parallax',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/parallax.json',
            title: 'Parallax',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-sequencer',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/sequencer.json',
            title: 'Sequencer',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-scrolltrigger',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/scrollTrigger.json',
            title: 'ScrollTrigger',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-sync-timeline',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/syncTimeline.json',
            title: 'Sync timeline',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-create-stagger',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/createStagger.json',
            title: 'CreateStagger',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-async-timeline',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/asyncTimeline.json',
            title: 'Async timeline',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-tween-spring-lerp',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/tweenSpringLerp.json',
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
