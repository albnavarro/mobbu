import { MobJs } from '@mobJs';
import { MyOtherComponent } from './otherComponent/type';

const updateActiveState =
    MobJs.updateStateByName<MyOtherComponent>('instanceName');

updateActiveState('active', (val) => !val);
