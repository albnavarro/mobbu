import { htmlObject } from '@mobJs';

export const MyComponent = () => {
    return htmlObject({
        className: 'container',
        content: [
            {
                tag: 'span',
                className: 'my-class-1',
            },
            {
                tag: 'span',
                className: 'my-class-1 my-class-2',
            },
            {
                tag: 'span',
                className: ['my-class-2', 'my-class-3'],
            },
        ],
    });
};
