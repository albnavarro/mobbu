import { startData, state1, state2, state3 } from './data';

// function asyncTest() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, 1000);
//     });
// }

function updateNewElement(id) {
    return `<strong>Current cards id:</strong> ${id
        .join(',')
        .replaceAll(',', ' | ')}`;
}

function afterUpdateList({ className, childrenId }) {
    const newElement = document.querySelector(className);
    newElement.textContent = '';
    newElement.insertAdjacentHTML('afterbegin', updateNewElement(childrenId));
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DynamicList = async ({
    getState,
    setState,
    html,
    onMount,
    repeat,
    staticProps,
    bindProps,
    bindEvents,
    watchSync,
}) => {
    onMount(({ element }) => {
        const state1El = element.querySelector('.state1');
        const state2El = element.querySelector('.state2');
        const state3El = element.querySelector('.state3');
        const state4El = element.querySelector('.state4');
        const increaseCounterEl = element.querySelector('.counter');
        const counterEl = element.querySelector('.dynamic-list__counter span');

        state1El.addEventListener('click', () => {
            setState('data', state1);
            setState('data2', state1);
            setState('data3', state1);
        });

        state2El.addEventListener('click', () => {
            setState('data', state2);
            setState('data2', state2);
            setState('data3', state2);
        });

        state3El.addEventListener('click', () => {
            setState('data', state3);
            setState('data2', state3);
            setState('data3', state3);
        });

        state4El.addEventListener('click', () => {
            setState('data', startData);
            setState('data2', startData);
            setState('data3', startData);
        });

        increaseCounterEl.addEventListener('click', () => {
            setState('counter', (prev) => (prev += 1));
        });

        watchSync('counter', (value) => {
            counterEl.textContent = value;
        });

        return () => {
            element.remove();
        };
    });

    /**
     * Async test
     */
    // await asyncTest();

    return html`
        <dynamic-list class="dynamic-list">
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

            <div class="dynamic-list__counter">
                <h4>List counter</h4>
                <span>counter</span>
            </div>

            <div class="dynamic-list__content">
                <div class="dynamic-list__content__key">
                    <h4 class="dynamic-list__title">Dynamic list with key:</h4>
                    <p class="dynamic-list__newelements js-newelement-key"></p>
                    <div class="dynamic-list__list">
                        ${repeat({
                            watch: 'data',
                            key: 'key',
                            component: 'dynamic-list-card',
                            // eslint-disable-next-line no-unused-vars
                            beforeUpdate: ({ container, childrenId }) => {},
                            // eslint-disable-next-line no-unused-vars
                            afterUpdate: ({ container, childrenId }) => {
                                afterUpdateList({
                                    className: '.js-newelement-key',
                                    childrenId,
                                });
                            },
                            render: ({ key }) => {
                                return `
                                    <dynamic-list-card
                                        ${staticProps({
                                            parentListId: 1,
                                        })}
                                        ${bindProps({
                                            bind: ['counter', 'data'],
                                            props: (
                                                { counter },
                                                { current, index }
                                            ) => {
                                                return {
                                                    counter,
                                                    label: current.label,
                                                    index,
                                                };
                                            },
                                        })}
                                        ${bindEvents({
                                            mousedown: (
                                                e,
                                                { current, index }
                                            ) => console.log(current, index),
                                        })}
                                        ${key}
                                    >
                                    </dynamic-list-card>
                                `;
                            },
                        })}
                    </div>
                </div>

                <div class="dynamic-list__content__no-key">
                    <h4 class="dynamic-list__title">
                        Dynamic list without key:
                    </h4>
                    <p
                        class="dynamic-list__newelements js-newelement-nokey"
                    ></p>
                    <div class="dynamic-list__list">
                        ${repeat({
                            watch: 'data2',
                            component: 'dynamic-list-card',
                            // eslint-disable-next-line no-unused-vars
                            beforeUpdate: ({ container, childrenId }) => {},
                            // eslint-disable-next-line no-unused-vars
                            afterUpdate: ({ container, childrenId }) => {
                                afterUpdateList({
                                    className: '.js-newelement-nokey',
                                    childrenId,
                                });
                            },
                            render: ({ key }) => {
                                return `
                                    <dynamic-list-card
                                        ${staticProps({
                                            parentListId: 1,
                                        })}
                                        ${bindProps({
                                            bind: ['counter', 'data2'],
                                            props: (
                                                { counter },
                                                { current, index }
                                            ) => {
                                                return {
                                                    counter,
                                                    label: current.label,
                                                    index,
                                                };
                                            },
                                        })}
                                        ${bindEvents({
                                            mousedown: (
                                                e,
                                                { current, index }
                                            ) => console.log(current, index),
                                        })}
                                        ${key}
                                    >
                                    </dynamic-list-card>
                                `;
                            },
                        })}
                    </div>
                </div>

                <div class="dynamic-list__content__clean">
                    <h4 class="dynamic-list__title">Dynamic list clear:</h4>
                    <p
                        class="dynamic-list__newelements js-newelement-clear"
                    ></p>
                    <div class="dynamic-list__list">
                        ${repeat({
                            watch: 'data3',
                            clean: true,
                            component: 'dynamic-list-card',
                            // eslint-disable-next-line no-unused-vars
                            beforeUpdate: ({ container, childrenId }) => {},
                            // eslint-disable-next-line no-unused-vars
                            afterUpdate: ({ container, childrenId }) => {
                                afterUpdateList({
                                    className: '.js-newelement-clear',
                                    childrenId,
                                });
                            },
                            render: ({ key }) => {
                                return `
                                    <dynamic-list-card
                                        ${staticProps({
                                            parentListId: 2,
                                        })}
                                        ${bindProps({
                                            bind: ['counter', 'data3'],
                                            props: (
                                                { counter },
                                                { current, index }
                                            ) => {
                                                return {
                                                    counter,
                                                    label: current.label,
                                                    index,
                                                };
                                            },
                                        })}
                                        ${bindEvents({
                                            mousedown: (
                                                e,
                                                { current, index }
                                            ) => console.log(current, index),
                                        })}
                                        ${key}
                                    >
                                    </dynamic-list-card>
                                `;
                            },
                        })}
                    </div>
                </div>

                <div class="dynamic-list__content__bottom">
                    <h4 class="dynamic-list__title">Card outer list scope:</h4>
                    <dynamic-list-card
                        ${bindEvents([
                            {
                                click: (e) => console.log(e, 'click'),
                            },
                            {
                                mousedown: (e) => console.log(e, 'mousedown'),
                            },
                        ])}
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
                        <dynamic-list-slot
                            slot="card-slot"
                            ${staticProps({
                                staticFromComponent: `static prop from list`,
                            })}
                            ${bindProps({
                                bind: ['data', 'data2', 'counter'],
                                props: () => {
                                    return {
                                        /* HTML */
                                        parentParentState: `${JSON.stringify(
                                            getState(),
                                            null,
                                            4
                                        )}`,
                                    };
                                },
                            })}
                        >
                        </dynamic-list-slot>
                    </dynamic-list-card>
                </div>
            </div>
        </dynamic-list>
    `;
};
