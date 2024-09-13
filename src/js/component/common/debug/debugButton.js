//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

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
    invalidateIdPlaceHolderMap,
} from '../../../mobjs/modules/invalidate';
import { bindEventMap } from '../../../mobjs/modules/bindEvents';
import { currentRepeaterValueMap } from '../../../mobjs/modules/repeater/repeaterValue';
import { bindPropsMap } from '../../../mobjs/modules/bindProps';
import { onMountCallbackMap } from '../../../mobjs/modules/onMount';
import { activeRepeatMap } from '../../../mobjs/modules/repeater/activeRepeater';
import { repeaterTargetComponentMap } from '../../../mobjs/modules/repeater/targetcomponent';
import { staticPropsMap } from '../../../mobjs/modules/staticProps';
import { getUserChildPlaceholderSize } from '../../../mobjs/webComponent/usePlaceHolderToRender';

/** @type {MobComponent} */
export const DebugButtonFn = ({ html, delegateEvents }) => {
    return html`
        <button
            type="button"
            class="c-btn-debug"
            ${delegateEvents({
                click: () => {
                    mainStore.debugStore();
                    console.log('componentMap', componentMap);
                    console.log('Tree structure:', getTree());
                    console.log('bindEventMap', bindEventMap);
                    console.log('currentListValueMap', currentRepeaterValueMap);
                    console.log('activeRepeatMap', activeRepeatMap);
                    console.log('onMountCallbackMap', onMountCallbackMap);
                    console.log('staticPropsMap', staticPropsMap);
                    console.log('dynamicPropsMap', bindPropsMap);
                    console.log(
                        'repeaterTargetComponent',
                        repeaterTargetComponentMap
                    );
                    console.log('eventDelegationMap', eventDelegationMap);
                    console.log('tempDelegateEventMap', tempDelegateEventMap);
                    console.log(
                        'invalidateIdPlaceHolderMap',
                        invalidateIdPlaceHolderMap
                    );
                    console.log('invalidateFunctionMap', invalidateFunctionMap);
                    console.log(
                        'repeatIdPlaceHolderMap',
                        repeatIdPlaceHolderMap
                    );
                    console.log('repeatFunctionMap', repeatFunctionMap);
                    console.log(
                        'userChildPlaceholderSize',
                        getUserChildPlaceholderSize()
                    );
                },
            })}
        >
            Debug
        </button>
    `;
};
