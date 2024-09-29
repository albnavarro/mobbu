//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { SpacerAnchor } from './type';
 **/

import { anchorStore } from '../scrollTo/scrollToStore';

function hasAnchor({ id }) {
    return id && id.length > 0;
}

const options = {
    root: null,
    rootMargin: '0% 0% -100% 0%',
    threshold: 0.5,
};

/** @type {MobComponent<SpacerAnchor>} */
export const SpacerAnchorFn = async ({ html, getState, onMount }) => {
    const { style, line, id, label } = getState();
    const lineClass = line ? 'spacer--line' : '';

    onMount(({ element }) => {
        const shouldAddToAnchor = hasAnchor({ id });
        if (!shouldAddToAnchor) return;

        anchorStore.update('items', (val) => {
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

    return html`<div id="${id}" class="spacer spacer--${style} ${lineClass}">
        <span></span>
    </div>`;
};
