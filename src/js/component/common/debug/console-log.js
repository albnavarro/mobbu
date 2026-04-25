import { MobJs, MobJsInternal } from '@mobJs';

export const consoleLogDebug = () => {
    MobJs.mainStore.debugStore();
    console.log('componentMap', MobJsInternal.componentMap);
    console.log('Tree structure:', MobJs.getTree());
    console.log('bindEventMap', MobJsInternal.bindEventMap);
    console.log('currentListValueMap', MobJsInternal.currentRepeaterValueMap);
    console.log('activeRepeatMap', MobJsInternal.activeRepeatMap);
    console.log('onMountCallbackMap', MobJsInternal.onMountCallbackMap);
    console.log('staticPropsMap', MobJsInternal.staticPropsMap);
    console.log('dynamicPropsMap', MobJsInternal.bindPropsMap);
    console.log('eventDelegationMap', MobJsInternal.eventDelegationMap);
    console.log('tempDelegateEventMap', MobJsInternal.tempDelegateEventMap);
    console.log('invalidateIdHostMap', MobJsInternal.invalidateIdHostMap.size);
    console.log('invalidateIdsMap', MobJsInternal.invalidateIdsMap);
    console.log('invalidateInstancesMap', MobJsInternal.invalidateInstancesMap);
    console.log('repeatIdHostMap', MobJsInternal.repeatIdHostMap);
    console.log('repeatIdsMap', MobJsInternal.repeatIdsMap);
    console.log('repeatInstancesMap', MobJsInternal.repeatInstancesMap);
    console.log(
        'userChildPlaceholderSize',
        MobJsInternal.getUserChildPlaceholderSize()
    );
    console.log('slotPlaceholderSize', MobJsInternal.getSlotPlaceholderSize());
    console.log(
        'bindTextPlaceholderMapSize',
        MobJsInternal.getBindTextPlaceholderSize()
    );
    console.log('instanceMap', MobJsInternal.instanceMap);
};
