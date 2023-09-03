// @ts-check

export { removeAndDestroyById } from './componentStore/action/removeAndDestroy';
export { parseDom } from './parseComponent/componentParse';
export { componentStore } from './componentStore/store';
export { mainStore } from './mainStore/mainStore';
export { loadUrl } from './route/router';
export { createComponent } from './route/utils';
export { inizializeApp } from './route';
export { getIdByInstanceName } from './componentStore/action/component';
export { watchById } from './componentStore/action/watch';
export { setStateById } from './componentStore/action/state';
export { getStateById } from './componentStore/action/state';
export { getChildrenIdByName } from './componentStore/action/children';
export { getComponentNameById } from './componentStore/action/component';
export { getParentIdById } from './componentStore/action/parent';
export { getPropsFromParent } from './mainStore/actions/props';
export { slotName, useSlot, instanceName, staticProps } from './utils';
