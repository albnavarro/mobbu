import { bindEventMap } from '../../../mob/mobjs/modules/bindEvents';
import { currentRepeaterValueMap } from '../../../mob/mobjs/modules/repeater/repeaterValue';
import { onMountCallbackMap } from '../../../mob/mobjs/modules/onMount';
import { activeRepeatMap } from '../../../mob/mobjs/modules/repeater/activeRepeater';
import { staticPropsMap } from '../../../mob/mobjs/modules/staticProps';
import { getSlotPlaceholderSize } from '../../../mob/mobjs/modules/slot';
import { getUserChildPlaceholderSize } from '../../../mob/mobjs/modules/userComponent';
import {
    getBindTextParentSize,
    getBindTextPlaceholderSize,
} from '../../../mob/mobjs/modules/bindtext';
import { repeatIdPlaceHolderMap } from '../../../mob/mobjs/modules/repeater/repeatIdPlaceHolderMap';
import { repeatFunctionMap } from '../../../mob/mobjs/modules/repeater/repeatFunctionMap';
import { invalidateIdPlaceHolderMap } from '../../../mob/mobjs/modules/invalidate/invalidateIdPlaceHolderMap';
import { invalidateIdHostMap } from '../../../mob/mobjs/modules/invalidate/invalidateIdHostMap';
import { invalidateFunctionMap } from '../../../mob/mobjs/modules/invalidate/invalidateFunctionMap';
import { bindPropsMap } from '../../../mob/mobjs/modules/bindProps/bindPropsMap';
import { MobJs } from '@mobJs';

export const consoleLogDebug = () => {
    MobJs.mainStore.debugStore();
    console.log('componentMap', MobJs.componentMap);
    console.log('Tree structure:', MobJs.getTree());
    console.log('bindEventMap', bindEventMap);
    console.log('currentListValueMap', currentRepeaterValueMap);
    console.log('activeRepeatMap', activeRepeatMap);
    console.log('onMountCallbackMap', onMountCallbackMap);
    console.log('staticPropsMap', staticPropsMap);
    console.log('dynamicPropsMap', bindPropsMap);
    console.log('eventDelegationMap', MobJs.eventDelegationMap);
    console.log('tempDelegateEventMap', MobJs.tempDelegateEventMap);
    console.log('invalidateIdPlaceHolderMap', invalidateIdPlaceHolderMap);
    console.log('invalidateIdHostMap', invalidateIdHostMap.size);
    console.log('invalidateFunctionMap', invalidateFunctionMap);
    console.log('repeatIdPlaceHolderMap', repeatIdPlaceHolderMap);
    console.log('repeatFunctionMap', repeatFunctionMap);
    console.log('userChildPlaceholderSize', getUserChildPlaceholderSize());
    console.log('slotPlaceholderSize', getSlotPlaceholderSize());
    console.log('bindTextMapSize', getBindTextParentSize());
    console.log('bindTextPlaceholderMapSize', getBindTextPlaceholderSize());
};
