import { pageNotFound } from './404';
import { layoutSidebarAnchor } from './Layout/layoutSidebarAnchor';
import { layoutSidebarLinks } from './Layout/layoutSidebarLinks';
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/updateStateByName.json',
            title: 'updateStateByName',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
        },
    },
    {
        name: 'mobJs-useMethodByName',
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/delegateEvents.json',
            title: 'delegateEvents',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-methods',
        templateName: 'doc-links',
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
        templateName: 'doc-links',
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/refs.json',
            title: 'refs',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-repeat',
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
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
        templateName: 'doc-links',
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/slot.json',
            title: 'slot',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    {
        name: 'mobJs-runtime',
        templateName: 'doc-anchor',
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/runtime.json',
            title: 'runtime',
            section: 'mobJs',
            breadCrumbs: './#mobJs-overview',
        },
    },
    {
        name: 'mobMotion-stagger',
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
        templateName: 'doc-anchor',
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
