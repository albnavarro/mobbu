import { MobJs } from '@mobJs';
import { MyOtherComponent } from './otherComponent/type';

const setToTopState = MobJs.setStateByName<MyOtherComponent>('instanceName');
setToTopState('active', false);
