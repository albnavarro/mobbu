import { getLegendData } from '../../../data';
import { getIdByInstanceName, html, setStateById, tick } from '../../../mobjs';
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
                        click: async () => {
                            setState('data', data);
                            setState('activeSample', index);

                            await tick();
                            console.log('resolve list update');
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
export const DynamicListFn = async ({
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

        /**
         * Code button
         */
        const { repeater } = getLegendData();
        const { source } = repeater;
        const codeButtonId = getIdByInstanceName('global-code-button');
        setStateById(codeButtonId, 'drawers', [
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
        ]);
        setStateById(codeButtonId, 'color', 'black');

        watchSync('counter', (value) => {
            counterEl.textContent = value;
        });

        return () => {
            setStateById(codeButtonId, 'drawers', []);
        };
    });

    return html`
        <div class="c-dynamic-list">
            <only-desktop></only-desktop>
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${getButton({
                        setState,
                        delegateEvents,
                        staticProps,
                        bindProps,
                    })}
                    <dynamic-list-button
                        ${staticProps({ label: 'increase counter' })}
                        ${delegateEvents({
                            click: async () => {
                                setState('counter', (prev) => (prev += 1));
                                await tick();

                                console.log('resolve increment');
                            },
                        })}
                    ></dynamic-list-button>
                </div>
            </div>

            <div class="c-dynamic-list__counter">
                <h4>List counter</h4>
                <span ref="counterEl"></span>
            </div>

            <div class="c-dynamic-list__container">
                <div class="c-dynamic-list__grid">
                    ${getRepeaters({ bindProps, staticProps })}
                </div>
            </div>
        </div>
    `;
};
