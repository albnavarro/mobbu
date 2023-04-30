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
                        <button
                            type="button"
                            class="l-h-scroller__btn js-button"
                        ></button>
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
        const buttons = element.querySelectorAll('.js-button');
        const navButtons = element.querySelectorAll('.js-nav-button');
        const titles = element.querySelectorAll('.js-title h1');
        const destroy = horizontalScrollerAnimation({ buttons, titles });

        [...navButtons].forEach((button) => {
            button.addEventListener('click', (e) => {
                const target = e.currentTarget;
                const { id } = target.dataset;
                const shadowCenter = element.querySelector(
                    `.shadowClass--section-${id} .shadowClass--in-center`
                );
                const { top } = offset(shadowCenter);
                const height = outerHeight(shadowCenter);

                const scrollValue =
                    parseInt(id) === 0 ? 0 : top + height - window.innerHeight;

                bodyScroll.to(scrollValue, { duration: 2000 });
            });
        });

        return () => {
            destroy();
        };
    });

    const { caterpillarN1 } = getLegendData();
    const { title, description, type, source } = caterpillarN1;

    return render(/* HTML */ `<div class="l-h-scroller">
        <div class="l-h-scroller__top">scroll</div>
        <legend
            data-props="${createProps({
                title,
                description,
                type,
                source,
            })}"
        ></legend>
        <ul class="l-h-scroller__nav">
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
        <div class="l-h-scroller__bottom">scroll</div>
    </div>`);
};
