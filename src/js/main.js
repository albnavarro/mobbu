// @ts-check

import { componentList } from './component/componentList';
import { navAccordion } from './component/layout/navigation/animation/navAccordion';
import { navigationScoller } from './component/layout/navigation/animation/navScroller';
import { core } from './mobbu';
import { inizializeApp } from './mobjs';
import { routeList } from './pages/routeList';

let commonData = {};
let legendData = {};
export const getCommonData = () => commonData;
export const getLegendData = () => legendData;

/**
 * Set default
 */
core.useLoad(() => {
    core.setDefault({
        deferredNextTick: true,
        useScaleFps: true,
        usePassive: true,
        mq: {
            desktop: 1024,
        },
        spring: {
            config: {
                customSpring: {
                    friction: 1,
                    mass: 1,
                    precision: 0.01,
                    tension: 180,
                    velocity: 0,
                },
            },
        },
    });

    core.printDefault();
});

/**
 * Load common data.
 */
const loadData = async () => {
    const commonData = await fetch(`../data/common.json`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.warn('Something went wrong.', err));

    const legendData = await fetch(`../data/legend.json`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.warn('Something went wrong.', err));

    return { commonData, legendData };
};

const init = async () => {
    const data = await loadData();
    commonData = data?.commonData;
    legendData = data?.legendData;

    inizializeApp({
        root: document.querySelector('#content'),
        componentList,
        routeList,
        index: 'home',
        pageNotFound: 'pageNotFound',
        afterInit: () => {
            navAccordion();
            navigationScoller();
        },
    });
};

init();
