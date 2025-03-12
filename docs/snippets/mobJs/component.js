import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponentFn = ({
    onMount,
    updateState,
    staticProps,
    bindProps,
    watch,
    delegateEvents,
    setRef,
    getRef,
    bindText,
}) => {
    onMount(({ element }) => {
        const { labelRef } = getRef();

        console.log(element); // div.
        console.log(labelRef); // h2.

        watch('myState', (value) => {
            labelRef.classList.toggle('my-class', value);
        });

        /**
         * Destroy function
         */
        return () => {};
    });

    /**
     * DOM component structure.
     */
    return html`
        <div>
            <h2
                ${delegateEvents({
                    click: () => updateState('myState', (value) => !value),
                })}
                ${setRef('labelRef')}
            >
                ${bindText`label: ${'label'}`}
            </h2>
            <child-component
                ${staticProps({
                    childProp1: 'myValue',
                    childProp2: 'myValue',
                })}
                ${bindProps({
                    bind: ['label', 'myArray'],
                    props: ({ label, myArray }) => {
                        return {
                            childProp3: label,
                            childProp4: myArray?.[0] ?? '',
                        };
                    },
                })}
            ></child-component>
        </div>
    `;
};
