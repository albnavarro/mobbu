//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { SetState, StaticProps, DelegateEvents, BindProps, SetStateByName  } from '../../../mobjs/type';
 * @import { DynamicList } from './type';
 * @import { DynamicListButton } from './button/type';]
 * @import { DynamicListRepeater } from './repeaters/type';]
 * @import { CodeButton } from '../../common/codeButton/type';
 **/

import { getLegendData } from '../../../data';
import { html, setStateByName, tick } from '../../../mobjs';
import { resumePageScroll, stopPageScroll } from '../../../mobMotion/plugin';
import {
    hideFooterShape,
    showFooterShape,
} from '../../common/shapes/shapUtils';
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
 * @param {SetState<DynamicList>} param.setState
 * @param {StaticProps} param.staticProps
 * @param {DelegateEvents} param.delegateEvents
 * @param {BindProps<DynamicList,DynamicListButton>} param.bindProps
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
                            stopPageScroll();
                            setState('data', data);
                            setState('activeSample', index);

                            await tick();
                            resumePageScroll();
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
 * @param {StaticProps} param.staticProps
 * @param {BindProps<DynamicList, DynamicListRepeater>} param.bindProps
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

/** @type {MobComponent<DynamicList>} */
export const DynamicListFn = ({
    setState,
    updateState,
    html,
    onMount,
    staticProps,
    bindProps,
    delegateEvents,
    invalidate,
    bindText,
}) => {
    /** @type {SetStateByName<CodeButton>} */
    const setCodeButtonState = setStateByName('global-code-button');

    onMount(() => {
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
        hideFooterShape();

        return () => {
            setCodeButtonState('drawers', []);
            showFooterShape();
        };
    });

    return html`
        <div class="c-dynamic-list">
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
                        ${staticProps({ label: '+ counter ( max: 10 )' })}
                        ${delegateEvents({
                            click: async () => {
                                updateState('counter', (prev) => {
                                    return prev + 1;
                                });
                            },
                        })}
                    ></dynamic-list-button>
                    <dynamic-list-button
                        class="c-dynamic-list__top__button"
                        ${staticProps({ label: '- counter: ( min 0 )' })}
                        ${delegateEvents({
                            click: async () => {
                                updateState('counter', (prev) => {
                                    if (prev > 0) return (prev -= 1);
                                    return prev;
                                });
                            },
                        })}
                    ></dynamic-list-button>
                </div>
            </div>

            <!-- Invalidate -->
            <div class="c-dynamic-list__invalidate">
                <h4 class="c-dynamic-list__invalidate__title">
                    Invalidate component on counter mutation:
                </h4>
                <div class="c-dynamic-list__invalidate__wrap">
                    ${invalidate({
                        bind: 'counter',
                        render: ({ html }) => {
                            return html`<div class="validate-test-wrapper">
                                <dynamic-list-card-inner
                                    ${bindProps({
                                        props: ({ counter }) => {
                                            return {
                                                key: `${counter}`,
                                            };
                                        },
                                    })}
                                ></dynamic-list-card-inner>
                            </div>`;
                        },
                    })}
                </div>
            </div>

            <div class="c-dynamic-list__counter">
                <h4>List counter</h4>
                <span>${bindText`${'counter'}`}</span>
            </div>

            <!-- Repeaters -->
            <div class="c-dynamic-list__container">
                <div class="c-dynamic-list__grid">
                    ${getRepeaters({ bindProps, staticProps })}
                </div>
            </div>
        </div>
    `;
};
