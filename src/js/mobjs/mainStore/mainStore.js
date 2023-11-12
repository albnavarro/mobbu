// @ts-check

import { mobCore } from '../../mobCore';

export const mainStore = mobCore.createStore({
    contentId: () => ({
        value: '',
        type: String,
    }),
    rootElement: () => ({
        value: document.createElement('div'),
        type: HTMLElement,
    }),
    index: () => ({
        value: '',
        type: String,
    }),
    pageNotFound: () => ({
        value: '',
        type: String,
    }),
    componentList: () => ({
        value: {},
        type: 'any',
    }),
    routeList: () => ({
        value: {},
        type: 'any',
    }),
    activeRoute: () => ({
        value: '',
        type: String,
    }),
    beforeRouteLeave: () => ({
        value: '',
        type: String,
        skipEqual: false,
    }),
    beforeRouteChange: () => ({
        value: '',
        type: String,
        skipEqual: false,
    }),
    atfterRouteChange: () => ({
        value: '',
        type: String,
        skipEqual: false,
    }),
    repeaterParserRoot: () => ({
        value: document.createElement('div'),
        type: HTMLElement,
    }),
});
