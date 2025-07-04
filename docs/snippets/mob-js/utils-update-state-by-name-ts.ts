import { MobJs } from '@mobJs';
import { UpdateStateByName } from '@mobJsType';
import { MyOtherComponent } from './otherComponent/type';

const updateActiveState: UpdateStateByName<MyOtherComponent> =
    MobJs.updateStateByName('instanceName');

updateActiveState('active', (val) => !val);
