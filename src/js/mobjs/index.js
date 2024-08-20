// @ts-check

export {
    eventDelegationMap,
    tempDelegateEventMap,
} from './modules/delegateEvents';
export { getPropsFromParent } from './modules/staticProps';
export { componentMap } from './component/store';
export { renderHtml as html } from './parse/steps/utils';
export { createComponent } from './component/createComponent';
export { setDefaultComponent } from './component/createComponent';
export { removeAndDestroyById } from './component/action/removeAndDestroy';
export { removeOrphanComponent } from './component/action/removeAndDestroy';
export { mainStore } from './mainStore/mainStore';
export { loadUrl } from './route';
export { inizializeApp } from './inizializeApp';
export { getIdByInstanceName } from './component/action/component';
export { watchById } from './component/action/watch';
export { setStateById } from './component/action/state';
export { setStateByName } from './component/action/state';
export { getStateById } from './component/action/state';
export { getStateByName } from './component/action/state';
export { getChildrenIdByName } from './component/action/children';
export { getComponentNameById } from './component/action/component';
export { getParentIdById } from './component/action/parent';
export { staticProps } from './utils';
export { tick } from './queque/tick';
export { getTree } from './component/action/getTree';
export {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_LEAVES,
    MAIN_STORE_ROUTE_IS_LOADING,
} from './mainStore/constant';
export { useComponent } from './component/componentList';
export { useMethodByName } from './component/action/methods';
