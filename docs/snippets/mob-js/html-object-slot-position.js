import { htmlObject } from '@mobJs';

export const MyComponent = () => {
    return htmlObject({
        component: MyChildComponent,
        slotPosition: 'my-slot-position',
    });
};
