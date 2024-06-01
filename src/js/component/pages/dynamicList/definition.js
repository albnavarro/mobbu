import { createComponent } from '../../../mobjs';
import { onlyDesktopDef } from '../../common/onlyDesktop/definition';
import { dynamicListButtonDef } from './button/definition';
import { startData } from './data';
import { DynamicList } from './dynamicList';
import { dynamicListRepeaterDef } from './repeaters/definition';

export const dynamicListDef = createComponent({
    name: 'dynamic-list',
    component: DynamicList,
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
    child: [dynamicListButtonDef, dynamicListRepeaterDef, onlyDesktopDef],
});
