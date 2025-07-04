import { MobJs } from '@mobJs';
import { SetStateByName } from '@mobJsType';
import { MyOtherComponent } from './otherComponent/type';

const setToTopState: SetStateByName<MyOtherComponent> =
    MobJs.setStateByName('instanceName');

setToTopState('active', false);
