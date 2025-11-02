import { html } from '@mobJs';
import { loadTextContent } from '@utils/utils';

/**
 * @param {Object} params
 * @param {import('@mobJsType').ProxiState<import('./type').DocSvg>} params.proxi
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
                observe: () => proxi.source,
                render: () => proxi.source,
            })}
        </div>
    `;
};
