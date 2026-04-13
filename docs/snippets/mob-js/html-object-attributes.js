import { htmlObject } from '@mobJs';

export const MyComponent = () => {
    return htmlObject({
        className: 'container',
        content: [
            {
                tag: 'a',
                attributes: { href: '#', name: 'my-name' },
            },
        ],
    });
};
