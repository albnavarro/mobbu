import { htmlObject } from '@mobJs';

export const MyComponent = () => {
    return htmlObject({
        className: 'container',
        content: [
            {
                tag: 'span',
                style: { background: black },
            },
        ],
    });
};
