import { getLegendData } from '../../../../data';
import { motionCore } from '../../../../mobMotion';

/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const M3 = ({ onMount, html, getState, staticProps }) => {
    const isDesktop = motionCore.mq('min', 'desktop');

    const { svg } = isDesktop ? getState() : '';

    const { child } = getLegendData();
    const { source } = child;

    onMount(() => {
        if (!isDesktop) return;

        return () => {};
    });

    /**
     * Desktop
     */
    return html`<div class="svg-m3-container">
        <only-desktop></only-desktop>
        <div class="svg-m3">${svg}</div>
        <code-button
            ${staticProps({
                drawers: [
                    {
                        label: 'description',
                        source: source.description,
                    },
                    {
                        label: 'definition',
                        source: source.definition,
                    },
                    {
                        label: 'component',
                        source: source.component,
                    },
                    {
                        label: 'animation',
                        source: source.animation,
                    },
                ],
                style: 'legend',
            })}
        >
        </code-button>
    </div>`;
};
