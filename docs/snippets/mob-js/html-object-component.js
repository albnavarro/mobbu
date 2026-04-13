import { htmlObject } from '@mobJs';

export const MyComponent = () => {
    return htmlObject({
        component: MyChildComponent,
    });
};
