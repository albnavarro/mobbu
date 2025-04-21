//@ts-check

import { html } from '@mobJs';
import { loadTextContent } from '@utils/utils';

/**
 * @param {Object} params
 * @param {import('./type').DocSvg['state']} params.proxi
 */
const loadSvg = async ({ proxi }) => {
    const { success, data } = await loadTextContent({ source: proxi.url });
    if (!success) {
        return;
    }

    proxi.source = data;
};

/** @type {import('@mobJsType').MobComponent<import('./type').DocSvg>} */
export const DocSvgFn = ({ getProxi, invalidate, onMount }) => {
    const proxi = getProxi();

    onMount(() => {
        loadSvg({ proxi });
    });

    return html`
        <div class="c-doc-svg ${proxi.className}">
            ${invalidate({
                bind: 'source',
                render: () => proxi.source,
            })}
        </div>
    `;
};
