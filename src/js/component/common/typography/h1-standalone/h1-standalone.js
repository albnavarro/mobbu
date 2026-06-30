import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').H1Standalone>} */
export const H1StandaloneFn = ({ getSelfProxi }) => {
    const proxi = getSelfProxi();

    return htmlObject({
        className: 'h1-standalone',
        content: [
            {
                tag: 'h1',
                content: proxi.text,
            },
        ],
    });
};
