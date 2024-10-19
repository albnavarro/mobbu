// @ts-check

export { getChildrenIdByName } from './component/action/children';
export {
    getComponentNameById,
    getIdByInstanceName,
} from './component/action/component';
export { getTree } from './component/action/getTree';
export { useMethodByName } from './component/action/methods';
export { getParentIdById } from './component/action/parent';
export { removeAndDestroyById } from './component/action/removeAndDestroy/removeAndDestroyById';
export { getStateById } from './component/action/state/getStateById';
export { getStateByName } from './component/action/state/getStateByName';
export { setStateById } from './component/action/state/setStateById';
export { setStateByName } from './component/action/state/setStateByName';
export { updateStateByName } from './component/action/state/updateStateByName';
export { watchById } from './component/action/watch';
export { useComponent } from './component/componentList';
export {
    createComponent,
    getDebugMode,
    setDefaultComponent,
} from './component/createComponent';
export { componentMap } from './component/store';
export { inizializeApp } from './inizializeApp';
export {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_LEAVES,
    MAIN_STORE_ROUTE_IS_LOADING,
} from './mainStore/constant';
export { mainStore } from './mainStore/mainStore';
export {
    eventDelegationMap,
    tempDelegateEventMap,
} from './modules/delegateEvents';
export { getNumberOfActiveInvalidate } from './modules/invalidate/action/getNumberOfActiveInvalidate';
export { getNumberOfActiveRepeater } from './modules/repeater/action/getNumberOfActiveRepeater';
export { getPropsFromParent } from './modules/staticProps';
export { renderHtml as html } from './parse/steps/utils';
export { tick } from './queque/tick';
export { loadUrl } from './route';
export { staticProps } from './utils';
