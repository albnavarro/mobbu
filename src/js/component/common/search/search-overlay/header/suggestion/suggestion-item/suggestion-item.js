import { html } from '@mobJs';
import { closeSearchSuggestion, updateSearchFromSuggestion } from '../../utils';

/**
 * @param {object} params
 * @param {string} params.code
 * @param {string} params.word
 * @returns {void}
 */
const onKeyDown = ({ code, word }) => {
    if (code.toLowerCase() === 'enter') {
        updateSearchFromSuggestion(word);
        return;
    }

    if (code.toLowerCase() === 'escape') {
        closeSearchSuggestion();
        return;
    }
};

/** @type {import('@mobJsType').MobComponent<import('./type').SearchOverlaySugestionItem>} */
export const SearchOverlaySuggestionItemFn = ({
    getProxi,
    delegateEvents,
    bindObject,
}) => {
    const proxi = getProxi();

    return html`
        <li class="search-overlay-suggestion__item">
            <button
                type="button"
                class="search-overlay-suggestion__button"
                ${delegateEvents({
                    click: () => {
                        updateSearchFromSuggestion(proxi.word);
                    },
                    keydown: (/** @type {KeyboardEvent} */ event) => {
                        event.preventDefault();

                        onKeyDown({
                            code: event.code,
                            word: proxi.word,
                        });
                    },
                })}
            >
                ${bindObject`${() => proxi.wordHiglight}`}
            </button>
        </li>
    `;
};
