//@ts-check

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
} from '../../../mobjs/componentStore/action/repeat';
import {
    invalidateFunctionMap,
    invalidateIdPlaceHolderMap,
} from '../../../mobjs/componentStore/action/invalidate';
import { bindEventMap } from '../../../mobjs/temporaryData/bindEvents';
import { currentRepeaterValueMap } from '../../../mobjs/temporaryData/currentRepeaterItemValue';
import { dynamicPropsMap } from '../../../mobjs/temporaryData/dynamicProps';
import { onMountCallbackMap } from '../../../mobjs/temporaryData/onMount';
import { activeRepeatMap } from '../../../mobjs/temporaryData/repeaterActions';
import { repeaterTargetComponentMap } from '../../../mobjs/temporaryData/repeaterTargetComponent';
import { staticPropsMap } from '../../../mobjs/temporaryData/staticProps';
import { getUserChildPlaceholderSize } from '../../../mobjs/webComponent/usePlaceHolderToRender';

/**
 * @type {import('../../../mobjs/type').mobComponent}
 */
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
                    console.log('dynamicPropsMap', dynamicPropsMap);
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
