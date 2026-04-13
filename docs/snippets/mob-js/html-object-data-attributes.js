import { htmlObject } from '@mobJs';

export const MyComponent = () => {
    return htmlObject({
        className: 'container',
        content: [
            {
                tag: 'a',
                dataAttributes: { prop: 'prop-1', prop2: 'prop-2' },
            },
        ],
    });
};
