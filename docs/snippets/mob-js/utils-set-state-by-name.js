import { html, MobJs } from '@mobJs';

/**
 * Use variable for lsp reference.
 */
import { otherComponentName } from '';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount }) => {
    /**
     * @type {import('@mobJsType').SetStateByName<import('./otherComponent/type').MyOtherComponent>}
     */
    const setOtherComponentState = MobJs.setStateByName(otherComponentName);

    onMount(() => {
        setOtherComponentState('myState', value);
        setOtherComponentState('myState2', value2);
        return () => {};
    });

    return html` <div></div> `;
};
