import { startData, state1, state2, state3 } from './data';

function logChildren(getChildren) {
    console.log(getChildren('TestComponent2'));
}

function asyncTest() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    });
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const TestComponent = async ({
    getState,
    setState,
    getChildren,
    render,
    onMount,
    repeat,
    staticProps,
    bindProps,
}) => {
    const { title } = getState();
    let freezeButtonsData1 = false;
    let freezeButtonsData2 = false;

    onMount(({ element }) => {
        const childrenBtn = element.querySelector('.children');
        const state1El = element.querySelector('.state1');
        const state2El = element.querySelector('.state2');
        const state3El = element.querySelector('.state3');
        const resetEl = element.querySelector('.reset');
        const increaseCounterEl = element.querySelector('.counter');
        setState('data', startData);
        setState('data2', startData);

        childrenBtn.addEventListener('click', () => logChildren(getChildren));
        state1El.addEventListener('click', () => {
            if (!freezeButtonsData1) {
                setState('data', state1);
            }

            if (!freezeButtonsData2) {
                setState('data2', state1);
            }
        });
        state2El.addEventListener('click', () => {
            if (!freezeButtonsData1) {
                setState('data', state2);
            }

            if (!freezeButtonsData2) {
                setState('data2', state2);
            }
        });
        state3El.addEventListener('click', () => {
            if (!freezeButtonsData1) {
                setState('data', state3);
            }

            if (!freezeButtonsData2) {
                setState('data2', state3);
            }
        });
        resetEl.addEventListener('click', () => {
            if (!freezeButtonsData1) {
                setState('data', startData);
            }

            if (!freezeButtonsData2) {
                setState('data2', startData);
            }
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
        <div class="c-test-comp">
            <h4>t</h4>
            <div class="c-test-comp__label">
                <span>${title}:</span>
            </div>
            <div class="c-test-comp__top">
                <button class="c-test-comp__btn state1">state1</button>
                <button class="c-test-comp__btn state2">state2</button>
                <button class="c-test-comp__btn state3">state3</button>
                <button class="c-test-comp__btn reset">reset</button>
                <button class="c-test-comp__btn counter">+</button>
            </div>
            <div class="c-test-comp__top">
                <button class="c-test-comp__btn children">Children</button>
            </div>
            <TestComponent2
                ${bindProps({
                    bind: ['counter', 'data'],
                    props: ({ counter, data }) => {
                        return { label: data[0]?.key ?? '', index: 0, counter };
                    },
                })}
            ></TestComponent2>
            <div class="c-test-comp__list">
                ${repeat({
                    watch: 'data',
                    key: 'key',
                    component: 'TestComponent2',
                    props: ({ current, index }) => {
                        const { label } = current;
                        return { label, index };
                    },
                    bindProps: {
                        bind: ['counter'],
                        props: ({ counter }) => {
                            return {
                                counter,
                            };
                        },
                    },
                    // eslint-disable-next-line no-unused-vars
                    beforeUpdate: ({ container, childrenId }) => {
                        freezeButtonsData1 = true;
                    },
                    // eslint-disable-next-line no-unused-vars
                    afterUpdate: ({ container, childrenId }) => {
                        freezeButtonsData1 = false;
                    },
                })}
            </div>
            <div class="c-test-comp__list">
                ${repeat({
                    watch: 'data2',
                    component: 'TestComponent2',
                    props: ({ current, index }) => {
                        const { label } = current;
                        return { label, index };
                    },
                    bindProps: {
                        bind: ['counter'],
                        props: ({ counter }) => {
                            return {
                                counter,
                            };
                        },
                    },
                    // eslint-disable-next-line no-unused-vars
                    beforeUpdate: ({ container, childrenId }) => {
                        freezeButtonsData2 = true;
                    },
                    // eslint-disable-next-line no-unused-vars
                    afterUpdate: ({ container, childrenId }) => {
                        freezeButtonsData2 = false;
                    },
                })}
            </div>
            <TestComponent2
                ${bindProps({
                    bind: ['counter', 'data'],
                    props: ({ counter, data }) => {
                        return { label: data[1]?.key ?? '', index: 1, counter };
                    },
                })}
            >
                <div data-slotposition="slot1">
                    <div class="c-test3-comp">slot1</div>
                </div>
                <TestComponent3
                    data-slotposition="slot2"
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
                </TestComponent3>
            </TestComponent2>
        </div>
    `);
};
