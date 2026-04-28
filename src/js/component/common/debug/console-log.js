import { MobJs, MobJsInternal } from '@mobJs';

export const consoleLogDebug = () => {
    MobJs.mainStore.debugStore();
    console.log('componentMap', MobJsInternal.componentMap);
    console.log('instanceMap', MobJsInternal.instanceMap);
    console.log('Tree structure:', MobJs.getTree());
    console.log('eventDelegationMap', MobJsInternal.eventDelegationMap);
    console.log('invalidateIdHostMap', MobJsInternal.invalidateIdHostMap.size);
    console.log('invalidateIdsMap', MobJsInternal.invalidateIdsMap);
    console.log('invalidateInstancesMap', MobJsInternal.invalidateInstancesMap);
    console.log('activeRepeatMap', MobJsInternal.activeRepeatMap);
    console.log('repeatIdHostMap', MobJsInternal.repeatIdHostMap);
    console.log('repeatIdsMap', MobJsInternal.repeatIdsMap);
    console.log('repeatInstancesMap', MobJsInternal.repeatInstancesMap);
    console.log('-- temp map ---');
    console.log('bindEffectMap:', MobJsInternal.bindEffectMap.size);
    console.log('bindEventMap:', MobJsInternal.bindEventMap.size);
    console.log(
        'bindObjectToInitializeMap:',
        MobJsInternal.bindObjectToInitializeMap.size
    );
    console.log(
        'bindObjectPlaceHolderMap:',
        MobJsInternal.bindObjectPlaceHolderMap.size
    );
    console.log('bindPropsMap:', MobJsInternal.bindPropsMap.size);
    console.log(
        'bindComponentTobindId:',
        MobJsInternal.bindComponentTobindId.size
    );
    console.log(
        'bindTextToInitializeMap:',
        MobJsInternal.bindTextToInitializeMap.size
    );
    console.log(
        'bindTextPlaceHolderMap:',
        MobJsInternal.bindTextPlaceHolderMap.size
    );
    console.log(
        'tempDelegateEventMap:',
        MobJsInternal.tempDelegateEventMap.size
    );
    console.log(
        'currentRepeaterValueMap:',
        MobJsInternal.currentRepeaterValueMap.size
    );
    console.log('staticPropsMap:', MobJsInternal.staticPropsMap.size);
    console.log('onMountCallbackMap:', MobJsInternal.onMountCallbackMap.size);
    console.log('slotPlaceholder:', MobJsInternal.slotPlaceholder.size);
    console.log('userPlaceholder:', MobJsInternal.userPlaceholder.size);
    console.log('queque:', MobJsInternal.queque.size);
    console.log('invalidateQueque:', MobJsInternal.invalidateQueque.size);
    console.log('repeaterQueque:', MobJsInternal.repeaterQueque.size);
    console.log('----');
};
