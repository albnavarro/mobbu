import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').H1Standalone>} */
export const H1StandaloneFn = ({ getSelfProxi }) => {
    const proxi = getSelfProxi();

    return htmlObject({
        tag: 'h1',
        className: 'h1-standalone',
        content: proxi.text,
    });
};
