/**
 * @param {import("../mobjs/type").componentType}
 */
export const MyComponent = ({
    html,
    onMount,
    setState,
    getState,
    staticProps,
    bindProps,
    watch,
    delegateEvents,
}) => {
    /**
     * Label state initial value.
     */
    const { label } = getState();

    /**
     * getState(): Get component current state.
     * setState(): Update component state.
     * staticProps(): Set a non reactive child props.
     * bindProps(): Set reactive child props.
     * watch(): React to state change.
     * delegateEvents(): Use event like click etc...
     */

    /**
     * Function fired at the end of all component parse.
     * Here all components is attached to the DOM (if scoped params is disabled).
     * element: root DOM element.
     * refs: Object with all refs.
     */
    onMount(({ element, refs }) => {
        const { labelRef } = refs;

        console.log(element); // div.
        console.log(labelRef); // h2.

        /**
         * Update h2.
         */
        watch('label', (value) => {
            labelRef.textContent = value;
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
                    click: () => setState('label', 'new label value'),
                })}
                ref="labelRef"
            >
                ${label}
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
