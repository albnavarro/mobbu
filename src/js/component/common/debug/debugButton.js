import {
    componentMap,
    eventDelegationMap,
    mainStore,
    tempDelegateEventMap,
} from '../../../mobjs';
import { bindEventMap } from '../../../mobjs/temporaryData/bindEvents';
import { currentListValueMap } from '../../../mobjs/temporaryData/currentRepeaterItemValue';
import { dynamicPropsMap } from '../../../mobjs/temporaryData/dynamicProps';
import { onMountCallbackMap } from '../../../mobjs/temporaryData/onMount';
import { repeatMap } from '../../../mobjs/temporaryData/repeater/add';
import { activeRepeatMap } from '../../../mobjs/temporaryData/repeaterActions';
import { repeaterTargetComponentMap } from '../../../mobjs/temporaryData/repeaterTargetComponent';
import { staticPropsMap } from '../../../mobjs/temporaryData/staticProps';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DebugButton = ({ html, delegateEvents }) => {
    return html`
        <button
            type="button"
            class="c-btn-debug"
            ${delegateEvents({
                click: () => {
                    mainStore.debugStore();
                    console.log(componentMap);
                    console.log('bindEventMap', bindEventMap);
                    console.log('currentListValueMap', currentListValueMap);
                    console.log('activeRepeatMap', activeRepeatMap);
                    console.log('repeatMap', repeatMap);
                    console.log('onMountCallbackMap', onMountCallbackMap);
                    console.log('staticPropsMap', staticPropsMap);
                    console.log('dynamicPropsMap', dynamicPropsMap);
                    console.log(
                        'repeaterTargetComponent',
                        repeaterTargetComponentMap
                    );
                    console.log('eventDelegationMap', eventDelegationMap);
                    console.log('tempDelegateEventMap', tempDelegateEventMap);
                },
            })}
        >
            D
        </button>
    `;
};
