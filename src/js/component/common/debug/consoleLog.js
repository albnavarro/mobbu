import {
    componentMap,
    eventDelegationMap,
    getTree,
    mainStore,
    tempDelegateEventMap,
} from '../../../mobjs';
import { bindEventMap } from '../../../mobjs/modules/bindEvents';
import { currentRepeaterValueMap } from '../../../mobjs/modules/repeater/repeaterValue';
import { onMountCallbackMap } from '../../../mobjs/modules/onMount';
import { activeRepeatMap } from '../../../mobjs/modules/repeater/activeRepeater';
import { staticPropsMap } from '../../../mobjs/modules/staticProps';
import { getSlotPlaceholderSize } from '../../../mobjs/modules/slot';
import { getUserChildPlaceholderSize } from '../../../mobjs/modules/userComponent';
import {
    getBindTextParentSize,
    getBindTextPlaceholderSize,
} from '../../../mobjs/modules/bindtext';
import { repeatIdPlaceHolderMap } from '../../../mobjs/modules/repeater/repeatIdPlaceHolderMap';
import { repeatFunctionMap } from '../../../mobjs/modules/repeater/repeatFunctionMap';
import { invalidateIdPlaceHolderMap } from '../../../mobjs/modules/invalidate/invalidateIdPlaceHolderMap';
import { invalidateFunctionMap } from '../../../mobjs/modules/invalidate/invalidateFunctionMap';
import { bindPropsMap } from '../../../mobjs/modules/bindProps/bindPropsMap';

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
    console.log('eventDelegationMap', eventDelegationMap);
    console.log('tempDelegateEventMap', tempDelegateEventMap);
    console.log('invalidateIdPlaceHolderMap', invalidateIdPlaceHolderMap);
    console.log('invalidateFunctionMap', invalidateFunctionMap);
    console.log('repeatIdPlaceHolderMap', repeatIdPlaceHolderMap);
    console.log('repeatFunctionMap', repeatFunctionMap);
    console.log('userChildPlaceholderSize', getUserChildPlaceholderSize());
    console.log('slotPlaceholderSize', getSlotPlaceholderSize());
    console.log('bindTextMapSize', getBindTextParentSize());
    console.log('bindTextPlaceholderMapSize', getBindTextPlaceholderSize());
};
