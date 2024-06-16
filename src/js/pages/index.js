import { pageNotFound } from './404';
import { layoutSidebarAnchor } from './Layout/layoutSidebarAnchor';
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
import { mobJs_bindEvents } from './mobJs/bindEvents';
import { mobJs_bindProps } from './mobJs/bindProps';
import { mobJs_component } from './mobJs/component';
import { mobJs_computed } from './mobJs/computed';
import { mobJs_debug } from './mobJs/debug';
import { mobJs_delegateEvents } from './mobJs/delegateEvents';
import { mobJs_emit } from './mobJs/emit';
import { mobJs_emitAsync } from './mobJs/emitAsync';
import { mobJs_freezeProp } from './mobJs/freezeProp';
import { mobJs_getChildren } from './mobJs/getChildren';
import { mobJs_getParentId } from './mobJs/getParentId';
import { mobJs_getState } from './mobJs/getState';
import { mobJs_html } from './mobJs/html';
import { mobJs_initialization } from './mobJs/initialization';
import { mobJs_instanceName } from './mobJs/instanceName';
import { mobJs_onMount } from './mobJs/onMount';
import { mobJs_overview } from './mobJs/overview';
import { mobJs_refs } from './mobJs/refs';
import { mobJs_remove } from './mobJs/remove';
import { mobJs_removeDom } from './mobJs/removeDom';
import { mobJs_renderComponent } from './mobJs/renderComponent';
import { mobJs_repeat } from './mobJs/repeat';
import { mobJs_routing } from './mobJs/routing';
import { mobJs_runtime } from './mobJs/runtime';
import { mobJs_setState } from './mobJs/setState';
import { mobJs_slot } from './mobJs/slot';
import { mobJs_staticProps } from './mobJs/staticProps';
import { mobJs_syncParent } from './mobJs/syncParent';
import { mobJs_tick } from './mobJs/tick';
import { mobJs_unBind } from './mobJs/unBind';
import { mobJs_unFreezeProp } from './mobJs/unFreezeProp';
import { mobJs_utils } from './mobJs/utils';
import { mobJs_watch } from './mobJs/watch';
import { mobJs_watchParent } from './mobJs/watchParent';
import { mobJs_watchSync } from './mobJs/watchSync';
import { mobJs_web_component } from './mobJs/webComponent';
import { horizontalScroller } from './plugin/horizontalScroller';
import { child } from './svg/child';
import { mv1 } from './svg/mv1';

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
    mobJs_emit: {
        layout: mobJs_emit,
        props: {},
    },
    mobJs_html: {
        layout: mobJs_html,
        props: {},
    },
    mobJs_runtime: {
        layout: mobJs_runtime,
        props: {},
    },
    mobJs_refs: {
        layout: mobJs_refs,
        props: {},
    },
    mobJs_slot: {
        layout: mobJs_slot,
        props: {},
    },
    mobJs_tick: {
        layout: mobJs_tick,
        props: {},
    },
    mobJs_debug: {
        layout: mobJs_debug,
        props: {},
    },
    mobJs_utils: {
        layout: mobJs_utils,
        props: {},
    },
    mobJs_watch: {
        layout: mobJs_watch,
        props: {},
    },
    mobJs_remove: {
        layout: mobJs_remove,
        props: {},
    },
    mobJs_repeat: {
        layout: mobJs_repeat,
        props: {},
    },
    mobJs_unBind: {
        layout: mobJs_unBind,
        props: {},
    },
    mobJs_onMount: {
        layout: mobJs_onMount,
        props: {},
    },
    mobJs_routing: {
        layout: mobJs_routing,
        props: {},
    },
    mobJs_computed: {
        layout: mobJs_computed,
        props: {},
    },
    mobJs_getState: {
        layout: mobJs_getState,
        props: {},
    },
    mobJs_renderComponent: {
        layout: mobJs_renderComponent,
        props: {},
    },
    mobJs_initialization: {
        layout: mobJs_initialization,
        props: {},
    },
    mobJs_delegateEvents: {
        layout: mobJs_delegateEvents,
        props: {},
    },
    mobJs_web_component: {
        layout: mobJs_web_component,
        props: {},
    },
    mobJs_unFreezeProp: {
        layout: mobJs_unFreezeProp,
        props: {},
    },
    mobJs_instanceName: {
        layout: mobJs_instanceName,
        props: {},
    },
    mobJs_watchParent: {
        layout: mobJs_watchParent,
        props: {},
    },
    mobJs_staticProps: {
        layout: mobJs_staticProps,
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
    mobJs_bindEvents: {
        layout: mobJs_bindEvents,
        props: {},
    },
    mobJs_watchSync: {
        layout: mobJs_watchSync,
        props: {},
    },
    mobJs_removeDom: {
        layout: mobJs_removeDom,
        props: {},
    },
    mobJs_emitAsync: {
        layout: mobJs_emitAsync,
        props: {},
    },
    mobJs_component: {
        layout: mobJs_component,
        props: {},
    },
    mobJs_bindProps: {
        layout: mobJs_bindProps,
        props: {},
    },
    mobJs_setState: {
        layout: mobJs_setState,
        props: {},
    },
    mobJs_overview: {
        layout: mobJs_overview,
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
