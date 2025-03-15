import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponentFn = ({
    onMount,
    staticProps,
    bindProps,
    delegateEvents,
    setRef,
    getRef,
    bindText,
    getProxi,
    computed,
    bindEffect,
}) => {
    const proxi = getProxi();

    computed('prop2', () => {
        return proxi.proxi * 2;
    });

    onMount(({ element }) => {
        const { labelRef } = getRef();

        console.log(element); // div.
        console.log(labelRef); // h2.

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
                    click: () => (proxi.counter += 1),
                })}
                ${bindEffect({
                    toggleClass: {
                        active: proxi.active,
                    },
                })}
                ${setRef('labelRef')}
            >
                ${bindText`label: ${'prop'}`}
            </h2>
            <child-component
                ${staticProps({
                    childProp1: 'myValue',
                    childProp2: 'myValue',
                })}
                ${bindProps({
                    props: () => {
                        return {
                            childProp3: proxi.prop,
                            childProp4: proxi.prop2,
                        };
                    },
                })}
            ></child-component>
        </div>
    `;
};
