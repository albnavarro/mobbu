import { bindEventMap } from '../../../mob/mob-js/modules/bind-events';
import { currentRepeaterValueMap } from '../../../mob/mob-js/modules/repeater/repeater-value';
import { onMountCallbackMap } from '../../../mob/mob-js/modules/on-mount';
import { activeRepeatMap } from '../../../mob/mob-js/modules/repeater/active-repeater';
import { staticPropsMap } from '../../../mob/mob-js/modules/static-props';
import { getSlotPlaceholderSize } from '../../../mob/mob-js/modules/slot';
import { getUserChildPlaceholderSize } from '../../../mob/mob-js/modules/user-component';
import {
    getBindTextParentSize,
    getBindTextPlaceholderSize,
} from '../../../mob/mob-js/modules/bind-text';
import { repeatInstancesMap } from '../../../mob/mob-js/modules/repeater/repeat-id-intances-map';
import { repeatIdsMap } from '../../../mob/mob-js/modules/repeater/repeat-ids-map';
import { invalidateInstancesMap } from '../../../mob/mob-js/modules/invalidate/invalidate-id-instances-map';
import { invalidateIdHostMap } from '../../../mob/mob-js/modules/invalidate/invalidate-id-host-map';
import { invalidateIdsMap } from '../../../mob/mob-js/modules/invalidate/invalidate-ids-map';
import { bindPropsMap } from '../../../mob/mob-js/modules/bind-props/bind-props-map';
import { MobJs } from '@mobJs';
import { instanceMap } from 'src/js/mob/mob-js/component/instance-map';

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
    console.log('invalidateIdPlaceHolderMap', invalidateInstancesMap);
    console.log('invalidateIdHostMap', invalidateIdHostMap.size);
    console.log('invalidateFunctionMap', invalidateIdsMap);
    console.log('repeatIdPlaceHolderMap', repeatInstancesMap);
    console.log('repeatFunctionMap', repeatIdsMap);
    console.log('userChildPlaceholderSize', getUserChildPlaceholderSize());
    console.log('slotPlaceholderSize', getSlotPlaceholderSize());
    console.log('bindTextMapSize', getBindTextParentSize());
    console.log('bindTextPlaceholderMapSize', getBindTextPlaceholderSize());
    console.log('instanceMap', instanceMap);
};
