import { htmlObject } from '@mobJs';
import { MobComponent } from '@mobJsType';

export const MyComponentFn: MobComponent<MyComponent> = () => {
    return htmlObject({
        tag: 'h1',
        content: 'title',
    });
};
