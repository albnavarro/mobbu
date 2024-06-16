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
import { mobJs_freezeProp } from './mobJs/freezeProp';
import { mobJs_getChildren } from './mobJs/getChildren';
import { mobJs_getParentId } from './mobJs/getParentId';
import { mobJs_syncParent } from './mobJs/syncParent';
import { mobJs_unFreezeProp } from './mobJs/unFreezeProp';
import { mobJs_watchParent } from './mobJs/watchParent';
import { horizontalScroller } from './plugin/horizontalScroller';
import { child } from './svg/child';
import { mv1 } from './svg/mv1';

const mobJsComponentBreadCrumbs = [
    {
        url: './#mobJs_overview',
        title: 'mobJs',
    },
    {
        url: './#mobJs_component',
        title: 'component',
    },
];

export const routes = {
    pageNotFound: {
        layout: pageNotFound,
        props: {},
    },
    about: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/about.json',
            title: 'About',
            section: '',
            breadCrumbs: '',
        },
    },
    animatedPatternN0: {
        layout: animatedPatternN0,
        props: {},
    },
    animatedPatternN1: {
        layout: animatedPatternN1,
        props: {},
    },
    caterpillarN0: {
        layout: caterpillarN0,
        props: {},
    },
    caterpillarN1: {
        layout: caterpillarN1,
        props: {},
    },
    caterpillarN2: {
        layout: caterpillarN2,
        props: {},
    },
    canvas_overview: {
        layout: canvas_overview,
        props: {},
    },
    scrollerN0: {
        layout: scrollerN0,
        props: {},
    },
    scrollerN1: {
        layout: scrollerN1,
        props: {},
    },
    dynamic_list: {
        layout: dynamic_list,
        props: {},
    },
    home: {
        layout: home,
        props: {},
    },
    mobCore_overview: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobCore/overview.json',
            title: 'mobCore',
            section: '',
            breadCrumbs: '',
        },
    },
    mobCore_defaults: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobCore/defaults.json',
            title: 'Defaults',
            section: 'mobCore',
            breadCrumbs: './#mobCore_overview',
        },
    },
    mobCore_events: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobCore/events.json',
            title: 'Events',
            section: 'mobCore',
            breadCrumbs: './#mobCore_overview',
        },
    },
    mobCore_store: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobCore/store.json',
            title: 'Store',
            section: 'mobCore',
            breadCrumbs: './#mobCore_overview',
        },
    },
    mobJs_overview: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/overview.json',
            title: 'mobJs',
            section: '',
            breadCrumbs: '',
        },
    },
    mobJs_initialization: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/initialization.json',
            title: 'initialization',
            section: 'mobJs',
            breadCrumbs: './#mobJs_overview',
        },
    },
    mobJs_component: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/component.json',
            title: 'component',
            section: 'mobJs',
            breadCrumbs: './#mobJs_overview',
        },
    },
    mobJs_web_component: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/webComponent.json',
            title: 'webComponent',
            section: 'mobJs',
            breadCrumbs: './#mobJs_overview',
        },
    },
    mobJs_routing: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/routing.json',
            title: 'routing',
            section: 'mobJs',
            breadCrumbs: './#mobJs_overview',
        },
    },
    mobJs_refs: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/refs.json',
            title: 'refs',
            section: 'mobJs',
            breadCrumbs: './#mobJs_overview',
        },
    },
    mobJs_slot: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/slot.json',
            title: 'slot',
            section: 'mobJs',
            breadCrumbs: './#mobJs_overview',
        },
    },
    mobJs_runtime: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/runtime.json',
            title: 'runtime',
            section: 'mobJs',
            breadCrumbs: './#mobJs_overview',
        },
    },
    mobJs_instanceName: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/instanceName.json',
            title: 'instanceName',
            section: 'mobJs',
            breadCrumbs: './#mobJs_overview',
        },
    },
    mobJs_tick: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/tick.json',
            title: 'tick',
            section: 'mobJs',
            breadCrumbs: './#mobJs_overview',
        },
    },
    mobJs_utils: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/utils.json',
            title: 'utils',
            section: 'mobJs',
            breadCrumbs: './#mobJs_overview',
        },
    },
    mobJs_debug: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobJs/debug.json',
            title: 'debug',
            section: 'mobJs',
            breadCrumbs: './#mobJs_overview',
        },
    },
    mobJs_html: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/html.json',
            title: 'html',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_onMount: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/onMount.json',
            title: 'onMount',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_getState: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/getState.json',
            title: 'getState',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_setState: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/setState.json',
            title: 'setState',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_watch: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/watch.json',
            title: 'watch',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_watchSync: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/watchSync.json',
            title: 'watchSync',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_staticProps: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/staticProps.json',
            title: 'staticProps',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_bindProps: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/bindProps.json',
            title: 'bindProps',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_bindEvents: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/bindEvents.json',
            title: 'bindEvents',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_delegateEvents: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/delegateEvents.json',
            title: 'delegateEvents',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_repeat: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/repeat.json',
            title: 'repeat',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_unBind: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/unBind.json',
            title: 'unBind',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_emit: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/emit.json',
            title: 'emit',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_emitAsync: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/emitAsync.json',
            title: 'emitAsync',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_computed: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/computed.json',
            title: 'computed',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_renderComponent: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/renderDom.json',
            title: 'renderDom',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_removeDom: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/removeDom.json',
            title: 'removeDom',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_remove: {
        layout: layoutSidebarLinks,
        props: {
            source: './data/mobJs/remove.json',
            title: 'remove',
            section: 'mobjs',
            breadCrumbs: mobJsComponentBreadCrumbs,
        },
    },
    mobJs_unFreezeProp: {
        layout: mobJs_unFreezeProp,
        props: {},
    },
    mobJs_watchParent: {
        layout: mobJs_watchParent,
        props: {},
    },
    mobJs_getParentId: {
        layout: mobJs_getParentId,
        props: {},
    },
    mobJs_getChildren: {
        layout: mobJs_getChildren,
        props: {},
    },
    mobJs_syncParent: {
        layout: mobJs_syncParent,
        props: {},
    },
    mobJs_freezeProp: {
        layout: mobJs_freezeProp,
        props: {},
    },
    mobMotion_stagger: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/stagger.json',
            title: 'Stagger',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion_overview',
        },
    },
    mobMotion_defaults: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/defaults.json',
            title: 'Defaults',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion_overview',
        },
    },
    mobMotion_overview: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/overview.json',
            title: 'mobMotion',
            section: '',
            breadCrumbs: '',
        },
    },
    mobMotion_parallax: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/parallax.json',
            title: 'Parallax',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion_overview',
        },
    },
    mobMotion_sequencer: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/sequencer.json',
            title: 'Sequencer',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion_overview',
        },
    },
    mobMotion_scrolltrigger: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/scrollTrigger.json',
            title: 'ScrollTrigger',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion_overview',
        },
    },
    mobMotion_sync_timeline: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/syncTimeline.json',
            title: 'Sync timeline',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion_overview',
        },
    },
    mobMotion_create_stagger: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/createStagger.json',
            title: 'CreateStagger',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion_overview',
        },
    },
    mobMotion_async_timeline: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/asyncTimeline.json',
            title: 'Async timeline',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion_overview',
        },
    },
    mobMotion_tween_spring_lerp: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/mobMotion/tweenSpringLerp.json',
            title: 'Tween Spring Lerp',
            section: 'mobMotion',
            breadCrumbs: './#mobMotion_overview',
        },
    },
    horizontalScroller: {
        layout: horizontalScroller,
        props: {},
    },
    plugin_overview: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/plugin/overview.json',
            title: 'Plugin',
            section: '',
            breadCrumbs: '',
        },
    },
    child: {
        layout: child,
        props: {},
    },
    mv1: {
        layout: mv1,
        props: {},
    },
    svg_overview: {
        layout: layoutSidebarAnchor,
        props: {
            source: './data/svg/overview.json',
            title: 'Svg',
            section: '',
            breadCrumbs: '',
        },
    },
};
