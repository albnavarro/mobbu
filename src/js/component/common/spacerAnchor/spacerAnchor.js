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
 * @param {import("../../../mobjs/type").componentType}
 */
export const SpacerAnchor = async ({ html, getState, onMount }) => {
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

        observer.observe(element, options);

        return () => {
            observer.unobserve(element);
        };
    });

    return html`<div class="spacer spacer--${style} ${lineClass}">
        <span></span>
    </div>`;
};
