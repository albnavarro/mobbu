import { htmlObject } from '@mobJs';

export const pageNotFound = () => {
    return htmlObject({
        className: 'error-page',
        content: {
            content: [
                {
                    tag: 'h1',
                    className: 'title title-big',
                    content: 'Page not found',
                },
                {
                    tag: 'a',
                    className: 'link',
                    attributes: { href: './#home' },
                    content: 'back to home',
                },
            ],
        },
    });
};
