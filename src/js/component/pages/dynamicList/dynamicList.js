import { startData, state1, state2, state3 } from './data';

function asyncTest() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DynamicList = async ({
    getState,
    setState,
    getChildren,
    render,
    onMount,
    repeat,
    staticProps,
    bindProps,
    useSlot,
}) => {
    onMount(({ element }) => {
        const state1El = element.querySelector('.state1');
        const state2El = element.querySelector('.state2');
        const state3El = element.querySelector('.state3');
        const state4El = element.querySelector('.state4');
        const increaseCounterEl = element.querySelector('.counter');

        state1El.addEventListener('click', () => {
            setState('data', state1);
            setState('data2', state1);
        });

        state2El.addEventListener('click', () => {
            setState('data', state2);
            setState('data2', state2);
        });

        state3El.addEventListener('click', () => {
            setState('data', state3);
            setState('data2', state3);
        });

        state4El.addEventListener('click', () => {
            setState('data', startData);
            setState('data2', startData);
        });

        increaseCounterEl.addEventListener('click', () => {
            setState('counter', (prev) => (prev += 1));
        });

        return () => {
            element.remove();
        };
    });

    /**
     * Async test
     */
    await asyncTest();

    return render(/* HTML */ `
        <div class="dynamic-list">
            <div class="dynamic-list__header">
                <div class="dynamic-list__top">
                    <button class="dynamic-list__btn state1">
                        data list 1
                    </button>
                    <button class="dynamic-list__btn state2">
                        data list 2
                    </button>
                    <button class="dynamic-list__btn state3">
                        data list 3
                    </button>
                    <button class="dynamic-list__btn state4">
                        data list 4
                    </button>
                    <button class="dynamic-list__btn counter">
                        Increase counter
                    </button>
                </div>
            </div>
            <div class="dynamic-list__content">
                <div class="dynamic-list__content__key">
                    <h4 class="dynamic-list__title">Dynamic list with key:</h4>
                    <div class="dynamic-list__list">
                        ${repeat({
                            watch: 'data',
                            key: 'key',
                            component: 'DynamicListCard',
                            props: ({ current, index }) => {
                                const { label } = current;
                                return { label, index };
                            },
                            bindProps: {
                                bind: ['counter'],
                                // eslint-disable-next-line no-unused-vars
                                props: ({ counter }, { current, index }) => {
                                    return {
                                        counter,
                                    };
                                },
                            },
                            // eslint-disable-next-line no-unused-vars
                            beforeUpdate: ({ container, childrenId }) => {},
                            // eslint-disable-next-line no-unused-vars
                            afterUpdate: ({ container, childrenId }) => {
                                const childrenEl =
                                    document.querySelector('.dynamic-children');
                                childrenEl.textContent = getChildren(
                                    'DynamicListCard'
                                )
                                    .join(',')
                                    .replaceAll(',', ' | ');
                            },
                        })}
                    </div>
                </div>
                <div class="dynamic-list__content__no-key">
                    <h4 class="dynamic-list__title">
                        Dynamic list without key:
                    </h4>
                    <div class="dynamic-list__list">
                        ${repeat({
                            watch: 'data2',
                            component: 'DynamicListCard',
                            props: ({ current, index }) => {
                                const { label } = current;
                                return { label, index };
                            },
                            bindProps: {
                                bind: ['counter'],
                                // eslint-disable-next-line no-unused-vars
                                props: ({ counter }, { current, index }) => {
                                    // console.log(current, index);
                                    return {
                                        counter,
                                    };
                                },
                            },
                            // eslint-disable-next-line no-unused-vars
                            beforeUpdate: ({ container, childrenId }) => {},
                            // eslint-disable-next-line no-unused-vars
                            afterUpdate: ({ container, childrenId }) => {},
                        })}
                    </div>
                </div>

                <div class="dynamic-list__content__bottom">
                    <h4 class="dynamic-list__title">Card outer list scope:</h4>
                    <DynamicListCard
                        ${staticProps({ isFull: true })}
                        ${bindProps({
                            bind: ['counter', 'data'],
                            props: ({ counter, data }) => {
                                return {
                                    label: data[1]?.key ?? '',
                                    index: 1,
                                    counter,
                                };
                            },
                        })}
                    >
                        <div ${useSlot('slot1')}>
                            <div class="c-test3-comp">slot1</div>
                        </div>
                        <DynamicListSlot
                            ${useSlot('slot2')}
                            ${staticProps({
                                staticFromComponent: `static prop from component`,
                            })}
                            ${bindProps({
                                bind: ['data', 'data2', 'counter'],
                                props: () => {
                                    return {
                                        parentParentState: `t state (reactive): ${JSON.stringify(
                                            getState()
                                        )}`,
                                    };
                                },
                            })}
                        >
                        </DynamicListSlot>
                    </DynamicListCard>
                </div>
            </div>
            <div>
                <h4 class="dynamic-list__title">
                    All child Card ineer/outer scope:
                </h4>
                <p class="dynamic-list__children dynamic-children"></p>
            </div>
        </div>
    `);
};
