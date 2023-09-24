import { html } from '../../../mobjs';
import { startData, state1, state2, state3 } from './data';

// function asyncTest() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, 1000);
//     });
// }

const buttons = [
    {
        buttonLabel: 'data1',
        data: state1,
    },
    {
        buttonLabel: 'data2',
        data: state2,
    },
    {
        buttonLabel: 'data3',
        data: state3,
    },
    {
        buttonLabel: 'data4',
        data: startData,
    },
];

const repeaters = [
    {
        label: 'dynamic list with key',
        key: 'key',
        clean: false,
    },
    {
        label: 'dynamic list without key',
        key: '',
        clean: false,
    },
    {
        label: 'dynamic list clear',
        key: '',
        clean: true,
    },
];

function getButton({ setState, staticProps, bindEvents, bindProps }) {
    return buttons
        .map((column, index) => {
            const { data, buttonLabel } = column;

            return html`
                <dynamic-list-button
                    ${staticProps({ label: buttonLabel })}
                    ${bindEvents({
                        click: () => {
                            setState('data', data);
                            setState('activeSample', index);
                        },
                    })}
                    ${bindProps({
                        bind: ['activeSample'],
                        props: ({ activeSample }) => {
                            return {
                                active: index === activeSample,
                            };
                        },
                    })}
                ></dynamic-list-button>
            `;
        })
        .join('');
}

function getRepeaters({ bindProps, staticProps }) {
    return repeaters
        .map((item, index) => {
            const { key, clean, label } = item;

            return html`
                <dynamic-list-repeater
                    ${staticProps({ listId: index, key, clean, label })}
                    ${bindProps({
                        bind: ['data', 'counter'],
                        props: ({ data, counter }) => {
                            return { data, counter };
                        },
                    })}
                ></dynamic-list-repeater>
            `;
        })
        .join('');
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DynamicList = async ({
    getState,
    setState,
    html,
    onMount,
    staticProps,
    bindProps,
    bindEvents,
    watchSync,
}) => {
    onMount(({ element }) => {
        const increaseCounterEl = element.querySelector('.counter');
        const counterEl = element.querySelector('.dynamic-list__counter span');

        increaseCounterEl.addEventListener('click', () => {
            setState('counter', (prev) => (prev += 1));
        });

        watchSync('counter', (value) => {
            counterEl.textContent = value;
        });
    });

    /**
     * Async test
     */
    // await asyncTest();

    return html`
        <dynamic-list class="dynamic-list">
            <div class="dynamic-list__header">
                <div class="dynamic-list__top">
                    ${getButton({
                        setState,
                        bindEvents,
                        staticProps,
                        bindProps,
                    })}
                    <button class="dynamic-list__btn counter">
                        Increase counter
                    </button>
                </div>
            </div>

            <div class="dynamic-list__counter">
                <h4>List counter</h4>
                <span></span>
            </div>

            <div class="dynamic-list__container">
                <div class="dynamic-list__grid">
                    ${getRepeaters({ bindProps, staticProps })}
                </div>
            </div>

            <div class="dynamic-list__container">
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
                                bind: ['data', 'counter'],
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
