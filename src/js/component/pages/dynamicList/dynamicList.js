import { getLegendData } from '../../../data';
import { html } from '../../../mobjs';
import { startData, state1, state2, state3 } from './data';

const buttons = [
    {
        buttonLabel: 'sample1',
        data: state1,
    },
    {
        buttonLabel: 'salmple2',
        data: state2,
    },
    {
        buttonLabel: 'sample3',
        data: state3,
    },
    {
        buttonLabel: 'Initial',
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

function getButton({ setState, staticProps, delegateEvents, bindProps }) {
    return buttons
        .map((column, index) => {
            const { data, buttonLabel } = column;

            return html`
                <dynamic-list-button
                    ${staticProps({ label: buttonLabel })}
                    ${delegateEvents({
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
    setState,
    html,
    onMount,
    staticProps,
    bindProps,
    delegateEvents,
    watchSync,
}) => {
    onMount(({ refs }) => {
        const { counterEl } = refs;

        watchSync('counter', (value) => {
            counterEl.textContent = value;
        });
    });

    const { repeater } = getLegendData();
    const { source } = repeater;

    return html`
        <dynamic-list class="dynamic-list">
            <div class="dynamic-list__header">
                <div class="dynamic-list__top">
                    ${getButton({
                        setState,
                        delegateEvents,
                        staticProps,
                        bindProps,
                    })}
                    <dynamic-list-button
                        ${staticProps({ label: 'increase counter' })}
                        ${delegateEvents({
                            click: () => {
                                setState('counter', (prev) => (prev += 1));
                            },
                        })}
                    ></dynamic-list-button>
                </div>
            </div>

            <div class="dynamic-list__counter">
                <h4>List counter</h4>
                <span ref="counterEl"></span>
            </div>

            <div class="dynamic-list__container">
                <div class="dynamic-list__grid">
                    ${getRepeaters({ bindProps, staticProps })}
                </div>
            </div>

            <code-button
                ${staticProps({
                    drawers: [
                        {
                            label: 'description',
                            source: source.description,
                        },
                        {
                            label: 'definition',
                            source: source.definition,
                        },
                        {
                            label: 'main',
                            source: source.mainComponent,
                        },
                        {
                            label: 'repeater',
                            source: source.repeaters,
                        },
                        {
                            label: 'buttons',
                            source: source.buttons,
                        },
                        {
                            label: 'cards',
                            source: source.cards,
                        },
                        {
                            label: 'data',
                            source: source.data,
                        },
                    ],
                    style: 'legend',
                })}
            >
            </code-button>
        </dynamic-list>
    `;
};
