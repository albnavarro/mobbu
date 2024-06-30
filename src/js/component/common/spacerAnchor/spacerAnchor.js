//@ts-check

import { anchorStore } from '../scrollTo/scrollToStore';

function hasAnchor({ id }) {
    return id && id.length > 0;
}

const options = {
    root: null,
    rootMargin: '0% 0% -100% 0%',
    threshold: 0.5,
};

/**
 * @type {import("../../../mobjs/type").mobComponent<import('./type').SpacerAnchor>}
 */
export const SpacerAnchorFn = async ({ html, getState, onMount }) => {
    const { style, line, id, label } = getState();
    const lineClass = line ? 'spacer--line' : '';

    onMount(({ element }) => {
        const shouldAddToAnchor = hasAnchor({ id });
        if (!shouldAddToAnchor) return;

        anchorStore.set('items', (val) => {
            return [...val, { id, label, element }];
        });

        const observer = new IntersectionObserver((entries) => {
            entries.map((entry) => {
                if (entry.isIntersecting) {
                    anchorStore.set('activeLabelFromObeserver', label);
                }
            });
        });

        // @ts-ignore
        observer.observe(element, options);

        return () => {
            observer.unobserve(element);
        };
    });

    return html`<div class="spacer spacer--${style} ${lineClass}">
        <span></span>
    </div>`;
};
