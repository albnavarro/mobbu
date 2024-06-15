import { pageNotFound } from './404';
import { about } from './about';
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
import { mobCore_defaults } from './mobCore/defaults';
import { mobCore_events } from './mobCore/events';
import { mobCore_overview } from './mobCore/overview';
import { mobCore_store } from './mobCore/store';
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
import { mobMotion_async_timeline } from './mobMotion/asyncTimeline';
import { mobMotion_create_stagger } from './mobMotion/createStagger';
import { mobMotion_defaults } from './mobMotion/defaults';
import { mobMotion_overview } from './mobMotion/overview';
import { mobMotion_parallax } from './mobMotion/parallax';
import { mobMotion_scrolltrigger } from './mobMotion/scrollTrigger';
import { mobMotion_sequencer } from './mobMotion/sequencer';
import { mobMotion_stagger } from './mobMotion/stagger';
import { mobMotion_sync_timeline } from './mobMotion/syncTimeline';
import { mobMotion_tween_spring_lerp } from './mobMotion/tweenSpringLerp';
import { horizontalScroller } from './plugin/horizontalScroller';
import { plugin_overview } from './plugin/overview';
import { child } from './svg/child';
import { mv1 } from './svg/mv1';
import { svg_overview } from './svg/overview';

export const routes = {
    pageNotFound: {
        layout: pageNotFound,
        props: {},
    },
    about: {
        layout: about,
        props: {},
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
    mobCore_defaults: {
        layout: mobCore_defaults,
        props: {},
    },
    mobCore_events: {
        layout: mobCore_events,
        props: {},
    },
    mobCore_overview: {
        layout: mobCore_overview,
        props: {},
    },
    mobCore_store: {
        layout: mobCore_store,
        props: {},
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
        layout: mobMotion_stagger,
        props: {},
    },
    mobMotion_defaults: {
        layout: mobMotion_defaults,
        props: {},
    },
    mobMotion_overview: {
        layout: mobMotion_overview,
        props: {},
    },
    mobMotion_parallax: {
        layout: mobMotion_parallax,
        props: {},
    },
    mobMotion_sequencer: {
        layout: mobMotion_sequencer,
        props: {},
    },
    mobMotion_scrolltrigger: {
        layout: mobMotion_scrolltrigger,
        props: {},
    },
    mobMotion_sync_timeline: {
        layout: mobMotion_sync_timeline,
        props: {},
    },
    mobMotion_create_stagger: {
        layout: mobMotion_create_stagger,
        props: {},
    },
    mobMotion_async_timeline: {
        layout: mobMotion_async_timeline,
        props: {},
    },
    mobMotion_tween_spring_lerp: {
        layout: mobMotion_tween_spring_lerp,
        props: {},
    },
    horizontalScroller: {
        layout: horizontalScroller,
        props: {},
    },
    plugin_overview: {
        layout: plugin_overview,
        props: {},
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
        layout: svg_overview,
        props: {},
    },
};
