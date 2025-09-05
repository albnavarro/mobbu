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
import { lettering01 } from './svg/mob-01';
import { onlyDesktop } from './onlyDesktop';
import { asyncTimeline } from './canvas/async-timeline';
import { rdp } from './svg/rdp';

export const PAGE_TEMPLATE_COMPONENT_MOBJS = 'templateMobJsComponent';
export const PAGE_TEMPLATE_DOCS_DEFAULT = 'templateDocDefault';
export const PAGE_TEMPLATE_LINKS = 'templateLinks';
export const PAGE_TEMPLATE_ANIMATION = 'templateAnimation';

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
        name: 'onlyDesktop',
        layout: onlyDesktop,
        props: {},
    },
    {
        name: 'about',
        layout: layoutAbout,
        templateName: 'about',
        props: {},
    },
    {
        name: 'canvas-overview',
        layout: layoutLinksPage,
        templateName: PAGE_TEMPLATE_LINKS,
        props: {
            source: './data/canvas/data.json',
        },
    },
    {
        name: 'animatedPatternN0',
        layout: animatedPatternN0,
        templateName: PAGE_TEMPLATE_ANIMATION,
        props: {},
    },
    {
        name: 'animatedPatternN1',
        layout: animatedPatternN1,
        templateName: PAGE_TEMPLATE_ANIMATION,
        props: {},
    },
    {
        name: 'caterpillarN0',
        layout: caterpillarN0,
        templateName: PAGE_TEMPLATE_ANIMATION,
        props: {},
    },
    {
        name: 'caterpillarN1',
        layout: caterpillarN1,
        templateName: PAGE_TEMPLATE_ANIMATION,
        props: {},
    },
    {
        name: 'caterpillarN2',
        layout: caterpillarN2,
        templateName: PAGE_TEMPLATE_ANIMATION,
        props: {},
    },
    {
        name: 'async-timeline',
        layout: asyncTimeline,
        templateName: PAGE_TEMPLATE_ANIMATION,
        props: {},
    },
    {
        name: 'scrollerN0',
        layout: scrollerN0,
        templateName: PAGE_TEMPLATE_ANIMATION,
        props: {},
    },
    {
        name: 'scrollerN1',
        layout: scrollerN1,
        templateName: PAGE_TEMPLATE_ANIMATION,
        props: {},
    },
    {
        name: 'dynamic-list',
        layout: dynamic_list,
        props: {
            source: './data/mob-js/general-repeat-test.json',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            title: '( test ) repeat & invalidate',
            section: 'mobJs',
        },
    },
    {
        name: 'matrioska',
        layout: matrioska_page,
        props: {
            source: './data/mob-js/matrioska.json',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            title: '( test ) matrioska',
            section: 'mobJs',
        },
    },
    {
        name: 'home',
        layout: home,
        templateName: 'home',
        props: {},
    },
    {
        name: 'mobCore-overview',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-core/overview.json',
            title: 'mobCore',
            breadCrumbs: [],
            section: 'mobCore',
        },
    },
    {
        name: 'mobCore-defaults',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-core/defaults.json',
            title: 'Defaults',
            breadCrumbs: mobCoreOverviewBreadCrumbs,
            section: 'mobCore',
        },
    },
    {
        name: 'mobCore-events',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-core/events.json',
            title: 'Events',
            breadCrumbs: mobCoreOverviewBreadCrumbs,
            section: 'mobCore',
        },
    },
    {
        name: 'mobCore-store',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-core/store.json',
            title: 'Store',
            breadCrumbs: mobCoreOverviewBreadCrumbs,
            section: 'mobCore',
        },
    },
    {
        name: 'mobJs-overview',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-js/overview.json',
            title: 'mobJs',
            breadCrumbs: [],
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-initialization',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-js/initialization.json',
            title: 'initialization',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-component',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-js/component.json',
            title: 'component',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-routing',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-js/routing.json',
            title: 'routing',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-benchmark-invalidate',
        layout: benchMark,
        props: {
            rootComponent: 'benchmark-invalidate',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            source: './data/mob-js/benchmark-invalidate.json',
            title: '( test ) benchmark invalidate',
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-benchmark-repeat-no-key',
        layout: benchMark,
        props: {
            rootComponent: 'benchmark-repeat-no-key',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            source: './data/mob-js/benchmark-repeat-without-key.json',
            title: '( test ) benchmark repeat without key',
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-benchmark-repeat-key',
        layout: benchMark,
        props: {
            rootComponent: 'benchmark-repeat-key',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            source: './data/mob-js/benchmark-repeat-key.json',
            title: '( test ) benchmark repeat key',
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-benchmark-repeat-no-key-nested',
        layout: benchMark,
        props: {
            rootComponent: 'benchmark-repeat-key-no-nested',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            source: './data/mob-js/benchmark-repeat-without-key-nested.json',
            title: '( test ) benchmark repeat nested without key',
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-benchmark-repeat-key-nested',
        layout: benchMark,
        props: {
            rootComponent: 'benchmark-repeat-key-nested',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            source: './data/mob-js/benchmark-repeat-key-nested.json',
            title: '( test ) benchmark repeat nested with key',
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-benchmark-repeat-key-bind-store',
        layout: benchMark,
        props: {
            rootComponent: 'benchmark-repeat-no-key-bind-store',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            source: './data/mob-js/benchmark-repeat-external.json',
            title: '( test ) benchmark repeat bindStore',
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-tick',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-js/tick.json',
            title: 'tick',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-utils',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-js/utils.json',
            title: 'utils',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-memory-management',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-js/memory-management.json',
            title: 'memory management',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-debug',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-js/debug.json',
            title: 'debug',
            breadCrumbs: mobJsOverviewBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-onMount',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/on-mount.json',
            title: 'onMount',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-getState',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/get-state.json',
            title: 'getState',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-setState',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/set-state.json',
            title: 'setState',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-updateState',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/update-state.json',
            title: 'updateState',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-getProxi',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/get-proxi.json',
            title: 'getProxi',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
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
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-staticProps',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/static-props.json',
            title: 'staticProps',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-dataAttribute',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/data-attribute.json',
            title: 'dataAttribute',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-bindProps',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/bind-props.json',
            title: 'bindProps',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-bindEvents',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/bind-events.json',
            title: 'bindEvents',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-delegateEvents',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/delegate-events.json',
            title: 'delegateEvents',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-bindtext',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/bind-text.json',
            title: 'bindText',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-bindObject',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/bind-object.json',
            title: 'bindObject',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-bind-effect',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/bind-effect.json',
            title: 'bindEffect',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-methods',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/methods.json',
            title: 'add methods',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-useMethodByName',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/use-method-by-name.json',
            title: 'useMethodByName',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-useMethodArrayByName',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/use-method-array-by-name.json',
            title: 'useMethodArrayByName',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-setStateByName',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/set-state-by-name.json',
            title: 'setStateByName',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-updateStateByName',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/update-state-by-name.json',
            title: 'updateStateByName',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
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
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-runtime',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/runtime.json',
            title: 'renderComponent',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
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
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-invalidate',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/invalidate.json',
            title: 'invalidate',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-invalidate-vs-repeater',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/invalidate-vs-repeater.json',
            title: 'invalidate vs repeater',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-web-component',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/web-component.json',
            title: 'webComponent',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
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
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-unBind',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/unbind.json',
            title: 'unBind',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
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
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-emitAsync',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/emit-async.json',
            title: 'emitAsync',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
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
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-bindStore',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/bind-store.json',
            title: 'bindStore',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-removeDom',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/remove-dom.json',
            title: 'removeDom',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
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
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-getChildren',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/get-children.json',
            title: 'getChildren',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-freezeProp',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/freeze-prop.json',
            title: 'freezeProp',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-unFreezeProp',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/unfreeze-prop.json',
            title: 'unFreezeProp',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-getParentId',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/get-parent-id.json',
            title: 'getParentId',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-watchParent',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/watch-parent.json',
            title: 'watchParent',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-instanceName',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/instance-name.json',
            title: 'instanceName',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobJs-class-list',
        templateName: PAGE_TEMPLATE_COMPONENT_MOBJS,
        layout: layoutSidebarLinks,
        props: {
            source: './data/mob-js/class-list.json',
            title: 'classList',
            breadCrumbs: mobJsComponentBreadCrumbs,
            section: 'mobJs',
        },
    },
    {
        name: 'mobMotion-stagger',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-motion/stagger.json',
            title: 'Stagger',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
            section: 'mobMotion',
        },
    },
    {
        name: 'mobMotion-defaults',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-motion/defaults.json',
            title: 'Defaults',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
            section: 'mobMotion',
        },
    },
    {
        name: 'mobMotion-overview',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-motion/overview.json',
            title: 'mobMotion',
            breadCrumbs: [],
            section: 'mobMotion',
        },
    },
    {
        name: 'mobMotion-parallax',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-motion/parallax.json',
            title: 'Parallax',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
            section: 'mobMotion',
        },
    },
    {
        name: 'mobMotion-sequencer',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-motion/sequencer.json',
            title: 'Sequencer',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
            section: 'mobMotion',
        },
    },
    {
        name: 'mobMotion-scrolltrigger',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-motion/scroll-trigger.json',
            title: 'ScrollTrigger',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
            section: 'mobMotion',
        },
    },
    {
        name: 'mobMotion-sync-timeline',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-motion/sync-timeline.json',
            title: 'Synctimeline',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
            section: 'mobMotion',
        },
    },
    {
        name: 'mobMotion-create-stagger',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-motion/create-stagger.json',
            title: 'CreateStagger',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
            section: 'mobMotion',
        },
    },
    {
        name: 'mobMotion-async-timeline',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-motion/async-timeline.json',
            title: 'Asynctimeline',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
            section: 'mobMotion',
        },
    },
    {
        name: 'mobMotion-tween-spring-lerp',
        layout: layoutSidebarAnchor,
        templateName: PAGE_TEMPLATE_DOCS_DEFAULT,
        props: {
            source: './data/mob-motion/tween-spring-lerp.json',
            title: 'TimeTween Spring Lerp',
            breadCrumbs: mobMotionOverviewBreadCrumbs,
            section: 'mobMotion',
        },
    },
    {
        name: 'horizontalScroller',
        layout: horizontalScroller,
        templateName: PAGE_TEMPLATE_ANIMATION,
        restoreScroll: false,
        props: {},
    },
    {
        name: 'plugin-overview',
        layout: layoutLinksPage,
        templateName: PAGE_TEMPLATE_LINKS,
        props: {
            source: './data/plugin/data.json',
        },
    },
    {
        name: 'move3D-shape1',
        templateName: PAGE_TEMPLATE_ANIMATION,
        layout: move3DRoute,
        props: move3DrouteProps.shape1,
    },
    {
        name: 'svg-overview',
        layout: layoutLinksPage,
        templateName: PAGE_TEMPLATE_LINKS,
        props: {
            source: './data/svg/data.json',
        },
    },
    {
        name: 'mob-01',
        layout: lettering01,
        templateName: PAGE_TEMPLATE_ANIMATION,
        props: {},
    },
    {
        name: 'rdp-01',
        layout: rdp,
        templateName: PAGE_TEMPLATE_ANIMATION,
        props: {},
    },
];
