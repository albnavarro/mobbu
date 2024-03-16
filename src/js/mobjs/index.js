// @ts-check

export {
    eventDelegationMap,
    tempDelegateEventMap,
} from './temporaryData/weakBindEvents';
export { getPropsFromParent } from './temporaryData/staticProps';
export { componentMap } from './componentStore/store';
export { renderHtml as html } from './creationStep/utils';
export { createComponent } from './createComponent';
export { setDefaultComponent } from './createComponent';
export { removeAndDestroyById } from './componentStore/action/removeAndDestroy';
export { removeOrphanComponent } from './componentStore/action/removeAndDestroy';
export { parseDom } from './parseComponent/componentParse';
export { mainStore } from './mainStore/mainStore';
export { loadUrl } from './route/router';
export { inizializeApp } from './route';
export { getIdByInstanceName } from './componentStore/action/component';
export { watchById } from './componentStore/action/watch';
export { setStateById } from './componentStore/action/state';
export { getStateById } from './componentStore/action/state';
export { getChildrenIdByName } from './componentStore/action/children';
export { getComponentNameById } from './componentStore/action/component';
export { getParentIdById } from './componentStore/action/parent';
export { staticProps } from './utils';
export { tick } from './componentStore/tick';
export { getTree } from './componentStore/action/getTree';
export {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_LEAVES,
    MAIN_STORE_ROUTE_IS_LOADING,
} from './mainStore/constant';
