import { pageNotFound } from './404';
import { layoutSidebarAnchor } from './Layout/layoutSidebarAnchor';
import { layoutSidebarLinks } from './Layout/layoutSidebarLinks';
import { benchMark } from './benchmark';
import { animatedPatternN0 } from './canvas/animatedPatternN0';
import { animatedPatternN1 } from './canvas/animatedPatternN1';
import { caterpillarN0 } from './canvas/caterpillarN0';
import { caterpillarN1 } from './canvas/caterpillarN1';
import { caterpillarN2 } from './canvas/caterpillarN2';
import { canvas_overview } from './canvas/overview';
import { scrollerN0 } from './canvas/scroller';
import { scrollerN1 } from './canvas/scrollerN1';
import { dynamic_list } from './dynamicList';
import { home } from './home';
import { matrioska_page } from './matrioska';
import { horizontalScroller } from './plugin/horizontalScroller';
import { child } from './svg/child';
import { mv1 } from './svg/mv1';

export const PAGE_TEMPLATE_DOCS_MOBJS = 'templateMobJsComponent';

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

/**
 * @type {import('../mobjs/type').Route[]}
 */
export const routes = [
    {
        name: 'pageNotFound',
        layout: pageNotFound,
        props: {},
    },
    {
        name: 'about',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/about.json',
            title: 'About',
            section: '',
            breadCrumbs: '',
        },
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
        layout: canvas_overview,
        props: {},
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
            section: '',
            breadCrumbs: '',
        },
    },
    {
        name: 'mobCore-defaults',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobCore/defaults.json',
            title: 'Defaults',
            section: 'mobCore',
            breadCrumbs: './#mobCore-overview',
        },
    },
    {
        name: 'mobCore-events',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobCore/events.json',
            title: 'Events',
            section: 'mobCore',
            breadCrumbs: './#mobCore-overview',
        },
    },
    {
        name: 'mobCore-store',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobCore/store.json',
            title: 'Store',
            section: 'mobCore',
            breadCrumbs: './#mobCore-overview',
        },
    },
    {
        name: 'mobJs-overview',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/overview.json',
            title: 'mobJs',
            section: '',
            breadCrumbs: '',
        },
    },
    {
        name: 'mobJs-initialization',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/initialization.json',
            title: 'initialization',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
        },
    },
    {
        name: 'mobJs-component',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/component.json',
            title: 'component',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
        },
    },
    {
        name: 'mobJs-web-component',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/webComponent.json',
            title: 'webComponent',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
        },
    },
    {
        name: 'mobJs-routing',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/routing.json',
            title: 'routing',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
        },
    },
    {
        name: 'mobJs-setStateByName',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/setStateByName.json',
            title: 'setStateByName',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
        },
    },
    {
        name: 'mobJs-updateStateByName',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/updateStateByName.json',
            title: 'updateStateByName',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
        },
    },
    {
        name: 'mobJs-debug-component',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/realWorld/debug-component.json',
            title: 'Debug component',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
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
        name: 'mobJs-useMethodByName',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/useMethodByName.json',
            title: 'useMethodByName',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
        },
    },
    {
        name: 'mobJs-tick',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/tick.json',
            title: 'tick',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
        },
    },
    {
        name: 'mobJs-utils',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/utils.json',
            title: 'utils',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
        },
    },
    {
        name: 'mobJs-debug',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/debug.json',
            title: 'debug',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
        },
    },
    {
        name: 'mobJs-html',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/html.json',
            title: 'html',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-onMount',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/onMount.json',
            title: 'onMount',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-getState',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/getState.json',
            title: 'getState',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-setState',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/setState.json',
            title: 'setState',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-updateState',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/updateState.json',
            title: 'updateState',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-watch',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/watch.json',
            title: 'watch',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-watchSync',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/watchSync.json',
            title: 'watchSync',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-staticProps',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/staticProps.json',
            title: 'staticProps',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindProps',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/bindProps.json',
            title: 'bindProps',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindEvents',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/bindEvents.json',
            title: 'bindEvents',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-delegateEvents',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/delegateEvents.json',
            title: 'delegateEvents',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bindtext',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/bindText.json',
            title: 'bindtext',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-bind-class-style',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/bindClassStyle.json',
            title: 'bindClass/Style',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-methods',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/methods.json',
            title: 'methods',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-refs',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/refs.json',
            title: 'refs',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-runtime',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/runtime.json',
            title: 'runtime',
            section: 'mobJs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-repeat',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/repeat.json',
            title: 'repeat',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-invalidate',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/invalidate.json',
            title: 'repeat',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-invalidate-vs-repeater',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/invalidate-vs-repeater.json',
            title: 'repeat',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-unBind',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/unBind.json',
            title: 'unBind',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-emit',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/emit.json',
            title: 'emit',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-emitAsync',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/emitAsync.json',
            title: 'emitAsync',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-computed',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/computed.json',
            title: 'computed',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-renderComponent',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/renderDom.json',
            title: 'renderDom',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-removeDom',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/removeDom.json',
            title: 'removeDom',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-remove',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/remove.json',
            title: 'remove',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-getChildren',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/getChildren.json',
            title: 'getChildren',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-freezeProp',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/freezeProp.json',
            title: 'freezeProp',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-unFreezeProp',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/unFreezeProp.json',
            title: 'unFreezeProp',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-getParentId',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/getParentId.json',
            title: 'getParentId',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-watchParent',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/watchParent.json',
            title: 'watchParent',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-instanceName',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/instanceName.json',
            title: 'instanceName',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-class-list',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/classList.json',
            title: 'classList',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-slot',
        templateName: PAGE_TEMPLATE_DOCS_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/slot.json',
            title: 'slot',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobMotion-stagger',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/stagger.json',
            title: 'Stagger',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion-overview',
        },
    },
    {
        name: 'mobMotion-defaults',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/defaults.json',
            title: 'Defaults',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion-overview',
        },
    },
    {
        name: 'mobMotion-overview',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/overview.json',
            title: 'mobMotion',
            section: '',
            breadCrumbs: '',
        },
    },
    {
        name: 'mobMotion-parallax',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/parallax.json',
            title: 'Parallax',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion-overview',
        },
    },
    {
        name: 'mobMotion-sequencer',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/sequencer.json',
            title: 'Sequencer',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion-overview',
        },
    },
    {
        name: 'mobMotion-scrolltrigger',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/scrollTrigger.json',
            title: 'ScrollTrigger',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion-overview',
        },
    },
    {
        name: 'mobMotion-sync-timeline',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/syncTimeline.json',
            title: 'Sync timeline',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion-overview',
        },
    },
    {
        name: 'mobMotion-create-stagger',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/createStagger.json',
            title: 'CreateStagger',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion-overview',
        },
    },
    {
        name: 'mobMotion-async-timeline',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/asyncTimeline.json',
            title: 'Async timeline',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion-overview',
        },
    },
    {
        name: 'mobMotion-tween-spring-lerp',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/tweenSpringLerp.json',
            title: 'Tween Spring Lerp',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion-overview',
        },
    },
    {
        name: 'horizontalScroller',
        templateName: 'generic',
        layout: horizontalScroller,
        props: {},
    },
    {
        name: 'plugin-overview',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/plugin/overview.json',
            title: 'Plugin',
            section: '',
            breadCrumbs: '',
        },
    },
    {
        name: 'child',
        layout: child,
        props: {},
    },
    {
        name: 'mv1',
        layout: mv1,
        props: {},
    },
    {
        name: 'svg-overview',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/svg/overview.json',
            title: 'Svg',
            section: '',
            breadCrumbs: '',
        },
    },
];
