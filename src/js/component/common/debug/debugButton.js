import { componentMap, mainStore } from '../../../mobjs';
import { bindEventMap } from '../../../mobjs/temporaryData/bindEvents';
import { currentListValueMap } from '../../../mobjs/temporaryData/currentRepeaterItemValue';
import { onMountCallbackMap } from '../../../mobjs/temporaryData/onMount';
import { repeatMap } from '../../../mobjs/temporaryData/repeater/add';
import { activeRepeatMap } from '../../../mobjs/temporaryData/repeaterActions';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DebugButton = ({ onMount, html }) => {
    onMount(({ element }) => {
        element.addEventListener('click', () => {
            mainStore.debugStore();
            console.log(componentMap);
            console.log('bindEventMap', bindEventMap);
            console.log('currentListValueMap', currentListValueMap);
            console.log('activeRepeatMap', activeRepeatMap);
            console.log('repeatMap', repeatMap);
            console.log('onMountCallbackMap', onMountCallbackMap);
        });

        return () => {};
    });

    return html`
        <button type="button" class="c-btn-debug">console debug</button>
    `;
};
