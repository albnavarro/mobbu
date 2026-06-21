import { htmlObject } from '@mobJs';
import { myInstanceName } from '../instanceName';

export const MyComponent = () => {
    return htmlObject({
        component: MyChildComponent,
        instanceName: myInstanceName,
    });
};
