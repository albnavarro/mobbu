import { createProps } from '../../../baseComponent/mainStore/actions/props';
import { bodyScroll } from '../../../mobbu/plugin';
import { offset, outerHeight } from '../../../mobbu/utils/vanillaFunction';
import { getLegendData } from '../../../route';
import { horizontalScrollerAnimation } from './animation/animation';

const getColumns = ({ numOfCol }) => {
    return [...Array(numOfCol).keys()]
        .map((_col, i) => {
            return /* HTML */ `
                <section
                    class="l-h-scroller__column js-column"
                    data-shadow="section-${i}"
                >
                    <div class="l-h-scroller__wrap">
                        <span class="l-h-scroller__indicator js-indicator">
                            <span></span>
                        </span>
                        <div class="l-h-scroller__title js-title">
                            <h1>${i}</h1>
                        </div>
                    </div>
                </section>
            `;
        })
        .join('');
};

const getNav = ({ numOfCol }) => {
    return [...Array(numOfCol).keys()]
        .map((_col, i) => {
            return /* HTML */ `
                <li>
                    <button
                        type="button"
                        data-id="${i}"
                        class="l-h-scroller__nav__btn js-nav-button"
                    >
                        ${i}
                    </button>
                </li>
            `;
        })
        .join('');
};

export const HorizontalScroller = ({ onMount, render }) => {
    onMount(({ element }) => {
        const indicators = element.querySelectorAll('.js-indicator');
        const nav = element.querySelector('.js-nav');
        const navButtons = element.querySelectorAll('.js-nav-button');
        const titles = element.querySelectorAll('.js-title h1');
        const { destroy, refresh } = horizontalScrollerAnimation({
            indicators,
            titles,
            nav,
        });

        [...navButtons].forEach((button) => {
            button.addEventListener('click', async (e) => {
                const target = e.currentTarget;
                const { id } = target.dataset;

                /**
                 * Hre the nav is open so on route landing the offset is wrong
                 * So, refresh scroller and the scroll to item.
                 */
                await refresh();

                /**
                 * Get item shadow element.
                 */
                const shadowCenter = element.querySelector(
                    `.shadowClass--section-${id} .shadowClass--in-center`
                );

                /**
                 * Get scroll value.
                 */
                const { top } = offset(shadowCenter);
                const height = outerHeight(shadowCenter);
                const scrollValue =
                    /**
                     * Need previous and current value to enter/leave etc.. so add 20 px to first item.
                     */
                    parseInt(id) === 0
                        ? window.innerHeight + 20
                        : top + height - window.innerHeight;

                /**
                 * Scroll
                 */
                bodyScroll.to(scrollValue, { duration: 2000 });
            });
        });

        return () => {
            destroy();
        };
    });

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    return render(/* HTML */ `<div class="l-h-scroller">
        <div class="l-h-scroller__top">scroll down</div>
        <CodeButton
            data-props="${createProps({
                description: source.description,
                js: source.js,
                scss: source.scss,
                html: source.html,
                style: 'legend',
            })}"
        >
        </CodeButton>
        <ul class="l-h-scroller__nav js-nav">
            ${getNav({ numOfCol: 10 })}
        </ul>
        <div class="l-h-scroller__root js-root">
            <div class="l-h-scroller__container js-container">
                <div class="l-h-scroller__row js-row">
                    ${getColumns({ numOfCol: 10 })}
                    <section
                        class="l-h-scroller__column l-h-scroller__column--last js-column"
                    ></section>
                </div>
                <div class="l-h-scroller__trigger js-trigger"></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`);
};
