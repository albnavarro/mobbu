import { bindEventMap } from '../../../mob/mob-js/modules/bindEvents';
import { currentRepeaterValueMap } from '../../../mob/mob-js/modules/repeater/repeaterValue';
import { onMountCallbackMap } from '../../../mob/mob-js/modules/onMount';
import { activeRepeatMap } from '../../../mob/mob-js/modules/repeater/activeRepeater';
import { staticPropsMap } from '../../../mob/mob-js/modules/staticProps';
import { getSlotPlaceholderSize } from '../../../mob/mob-js/modules/slot';
import { getUserChildPlaceholderSize } from '../../../mob/mob-js/modules/userComponent';
import {
    getBindTextParentSize,
    getBindTextPlaceholderSize,
} from '../../../mob/mob-js/modules/bindtext';
import { repeatIdPlaceHolderMap } from '../../../mob/mob-js/modules/repeater/repeat-id-placeholder-map';
import { repeatFunctionMap } from '../../../mob/mob-js/modules/repeater/repeat-function-map';
import { invalidateIdPlaceHolderMap } from '../../../mob/mob-js/modules/invalidate/invalidate-id-placeholder-map';
import { invalidateIdHostMap } from '../../../mob/mob-js/modules/invalidate/invalidate-id-host-map';
import { invalidateFunctionMap } from '../../../mob/mob-js/modules/invalidate/invalidate-function-map';
import { bindPropsMap } from '../../../mob/mob-js/modules/bindProps/bind-props-map';
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
