import {
    componentMap,
    eventDelegationMap,
    getTree,
    mainStore,
    tempDelegateEventMap,
} from '../../../mobjs';
import {
    repeatFunctionMap,
    repeatIdPlaceHolderMap,
} from '../../../mobjs/modules/repeater';
import {
    invalidateFunctionMap,
    invalidateIdHostMap,
    invalidateIdPlaceHolderMap,
} from '../../../mobjs/modules/invalidate';
import { bindEventMap } from '../../../mobjs/modules/bindEvents';
import { currentRepeaterValueMap } from '../../../mobjs/modules/repeater/repeaterValue';
import { bindPropsMap } from '../../../mobjs/modules/bindProps';
import { onMountCallbackMap } from '../../../mobjs/modules/onMount';
import { activeRepeatMap } from '../../../mobjs/modules/repeater/activeRepeater';
import { repeaterTargetComponentMap } from '../../../mobjs/modules/repeater/targetcomponent';
import { staticPropsMap } from '../../../mobjs/modules/staticProps';
import { getSlotPlaceholderSize } from '../../../mobjs/modules/slot';
import { getUserChildPlaceholderSize } from '../../../mobjs/modules/userComponent';

export const consoleLogDebug = () => {
    mainStore.debugStore();
    console.log('componentMap', componentMap);
    console.log('Tree structure:', getTree());
    console.log('bindEventMap', bindEventMap);
    console.log('currentListValueMap', currentRepeaterValueMap);
    console.log('activeRepeatMap', activeRepeatMap);
    console.log('onMountCallbackMap', onMountCallbackMap);
    console.log('staticPropsMap', staticPropsMap);
    console.log('dynamicPropsMap', bindPropsMap);
    console.log('repeaterTargetComponent', repeaterTargetComponentMap);
    console.log('eventDelegationMap', eventDelegationMap);
    console.log('tempDelegateEventMap', tempDelegateEventMap);
    console.log('invalidateIdPlaceHolderMap', invalidateIdPlaceHolderMap);
    console.log('invalidateIdHostMap', invalidateIdHostMap.size);
    console.log('invalidateFunctionMap', invalidateFunctionMap);
    console.log('repeatIdPlaceHolderMap', repeatIdPlaceHolderMap);
    console.log('repeatIdHostMap', invalidateIdHostMap.size);
    console.log('repeatFunctionMap', repeatFunctionMap);
    console.log('userChildPlaceholderSize', getUserChildPlaceholderSize());
    console.log('slotPlaceholderSize', getSlotPlaceholderSize());
};
