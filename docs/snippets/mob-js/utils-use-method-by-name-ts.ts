import { MobJs } from '@mobJs';
import { MyOtherComponent } from '../otherComponent/type';

/**
 * Use variable for lsp reference.
 */
import { otherComponentName } from '..';

const methods = MobJs.useMethodByName<MyOtherComponent>(otherComponentName);

methods?.myMethod('my_label');
