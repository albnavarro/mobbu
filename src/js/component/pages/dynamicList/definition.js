import { createComponent } from '../../../mobjs';
import { OnlyDesktop } from '../../common/onlyDesktop/definition';
import { DynamicListButton } from './button/definition';
import { startData } from './data';
import { DynamicListFn } from './dynamicList';
import { DynamicListRepeater } from './repeaters/definition';

export const DynamicList = createComponent({
    name: 'dynamic-list',
    component: DynamicListFn,
    state: {
        counter: () => ({
            value: 0,
            type: Number,
        }),
        data: () => ({
            value: startData,
            type: Array,
        }),
        activeSample: () => ({
            value: 3,
            type: Number,
        }),
    },
    child: [DynamicListButton, DynamicListRepeater, OnlyDesktop],
});
