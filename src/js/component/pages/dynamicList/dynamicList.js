//@ts-check

import { getLegendData } from '../../../data';
import { html, setStateByName, tick } from '../../../mobjs';
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
        label: 'repeater with key',
        key: 'key',
        clean: false,
    },
    {
        label: 'repeater without key',
        key: '',
        clean: false,
    },
    {
        label: 'repeater clear',
        key: '',
        clean: true,
    },
];

/**
 * @param {object} param
 * @param {import('../../../mobjs/type').SetState<import('./type').DynamicList>} param.setState
 * @param {import('../../../mobjs/type').StaticProps} param.staticProps
 * @param {import('../../../mobjs/type').DelegateEvents} param.delegateEvents
 * @param {import('../../../mobjs/type').BindProps<import('./type').DynamicList,import('./button/type').DynamicListButton>} param.bindProps
 */
function getButton({ setState, staticProps, delegateEvents, bindProps }) {
    return buttons
        .map((column, index) => {
            const { data, buttonLabel } = column;

            return html`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
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

/**
 * @param {object} param
 * @param {import('../../../mobjs/type').StaticProps} param.staticProps
 * @param {import('../../../mobjs/type').BindProps<import('./type').DynamicList, import('./repeaters/type').DynamicListRepeater>} param.bindProps
 */
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
 * @type {import('../../../mobjs/type').mobComponent<import('./type').DynamicList>}
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
    /**
     * @type {import('../../../mobjs/type').SetStateByName<import('../../common/codeButton/type').CodeButton>}
     */
    const setCodeButtonState = setStateByName('global-code-button');

    onMount(({ refs }) => {
        const { counterEl } = refs;

        /**
         * Code button
         */
        const { repeater } = getLegendData();
        const { source } = repeater;
        setCodeButtonState('drawers', [
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
        setCodeButtonState('color', 'black');

        watchSync('counter', (value) => {
            // @ts-ignore
            counterEl.textContent = `${value}`;
        });

        return () => {
            setCodeButtonState('drawers', []);
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
                        class="c-dynamic-list__top__button"
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
