import { htmlObject } from '@mobJs';
import { loadTextContent } from '@utils/utils';

/**
 * @param {Object} params
 * @param {import('@mobJsType').ProxiSelfState<import('./type').DocSvg>} params.proxi
 */
const loadSvg = async ({ proxi }) => {
    const { success, data } = await loadTextContent({ source: proxi.url });
    if (!success) {
        return;
    }

    proxi.source = data;
};

/** @type {import('@mobJsType').MobComponent<import('./type').DocSvg>} */
export const DocSvgFn = ({ getSelfProxi, invalidate, onMount }) => {
    const proxi = getSelfProxi();

    onMount(() => {
        loadSvg({ proxi });
    });

    return htmlObject({
        className: ['c-doc-svg', proxi.className ?? ''],
        content: invalidate({
            observe: () => proxi.source,
            render: () =>
                htmlObject({
                    content: proxi.source,
                }),
        }),
    });
};
