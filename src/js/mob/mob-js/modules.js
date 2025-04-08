// @ts-check

export {
    beforeRouteLeave,
    beforeRouteChange,
    afterRouteChange,
    onRouteLoading,
    getActiveRoute,
    getActiveParams,
} from './mainStore/main-store-api';
export { getChildrenIdByName } from './component/action/children';
export {
    getComponentNameById,
    getIdByInstanceName,
} from './component/action/component';
export { getTree } from './component/action/get-tree';
export {
    useMethodByName,
    useMethodArrayByName,
} from './component/action/methods';
export { getParentIdById } from './component/action/parent';
export { removeAndDestroyById } from './component/action/removeAndDestroy/remove-and-destroy-by-id';
export { getStateById } from './component/action/state/get-state-by-id';
export { getStateByName } from './component/action/state/get-state-by-name';
export { setStateById } from './component/action/state/set-state-by-id';
export { setStateByName } from './component/action/state/set-state-by-name';
export { updateStateByName } from './component/action/state/update-state-by-name';
export { watchById } from './component/action/watch';
export { useComponent } from './component/component-list';
export {
    createComponent,
    getDebugMode,
    setDefaultComponent,
} from './component/createComponent';
export { componentMap } from './component/store';
export { inizializeApp } from './inizializeApp';
export { mainStore } from './mainStore/main-store';
export {
    eventDelegationMap,
    tempDelegateEventMap,
} from './modules/delegateEvents';
export { getNumberOfActiveInvalidate } from './modules/invalidate/action/get-number-of-active-invalidate';
export { getNumberOfActiveRepeater } from './modules/repeater/action/get-number-of-active-repeater';
export { getPropsFromParent } from './modules/staticProps';
export { tick } from './queque/tick';
export { loadUrl } from './route';
export { staticProps } from './utils';
