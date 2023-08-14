import { createDynamicProps, createProps } from '../../../mobjs';
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
}) => {
    const { title } = getState();

    onMount(({ element }) => {
        const childrenBtn = element.querySelector('.children');
        const state1El = element.querySelector('.state1');
        const state2El = element.querySelector('.state2');
        const state3El = element.querySelector('.state3');
        const resetEl = element.querySelector('.reset');
        const increaseCounterEl = element.querySelector('.counter');
        setState('data', startData);

        childrenBtn.addEventListener('click', () => logChildren(getChildren));
        state1El.addEventListener('click', () => {
            setState('data', state1);
        });
        state2El.addEventListener('click', () => {
            setState('data', state2);
        });
        state3El.addEventListener('click', () => {
            setState('data', state3);
        });
        resetEl.addEventListener('click', () => {
            setState('data', startData);
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
                data-dynamicprops="${createDynamicProps({
                    bind: ['counter', 'data'],
                    props: ({ counter, data }) => {
                        return { label: data[0]?.key ?? '', index: 0, counter };
                    },
                })}"
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
                    dynamicProps: {
                        bind: ['counter'],
                        props: ({ counter }) => {
                            return {
                                counter,
                            };
                        },
                    },
                    // beforeUpdate: ({ container, childrenId }) => {
                    //     console.log(
                    //         `before update: ${(container, childrenId)}`
                    //     );
                    // },
                    // afterUpdate: ({ container, childrenId }) => {
                    //     console.log(`after update: ${(container, childrenId)}`);
                    // },
                })}
            </div>
            <div class="c-test-comp__list">
                ${repeat({
                    watch: 'data',
                    key: 'key',
                    component: 'TestComponent2',
                    props: ({ current, index }) => {
                        const { label } = current;
                        return { label, index };
                    },
                    dynamicProps: {
                        bind: ['counter'],
                        props: ({ counter }) => {
                            return {
                                counter,
                            };
                        },
                    },
                    // beforeUpdate: ({ container, childrenId }) => {
                    //     console.log(
                    //         `before update: ${(container, childrenId)}`
                    //     );
                    // },
                    // afterUpdate: ({ container, childrenId }) => {
                    //     console.log(`after update: ${(container, childrenId)}`);
                    // },
                })}
            </div>
            <TestComponent2
                data-dynamicprops="${createDynamicProps({
                    bind: ['counter', 'data'],
                    props: ({ counter, data }) => {
                        return { label: data[1]?.key ?? '', index: 1, counter };
                    },
                })}"
            >
                <div data-slotposition="slot1"><span>slot1</span></div>
                <Codebutton
                    data-slotposition="slot2"
                    data-props="${createProps({
                        drawers: {
                            js: 'test-js',
                            scss: 'test-scss',
                            component: 'test-html',
                        },
                        style: 'primary',
                    })}"
                >
                </Codebutton>
            </TestComponent2>
        </div>
    `);
};
