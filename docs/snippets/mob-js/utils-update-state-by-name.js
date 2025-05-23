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
     * @type {import('@mobJsType').UpdateStateByName<import('./other/type').OtherComponent>}
     */
    const setOtherComponentState = MobJs.updateStateByName(otherComponentName);

    onMount(() => {
        setOtherComponentState('myState', (value) => (value += 1));
        setOtherComponentState('myState2', (value) => (value += 1));
        return () => {};
    });

    return html` <div></div> `;
};
