import { createProps } from '../../../baseComponent/mainStore/actions/props';
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
                        >
                            ${i}
                        </button>
                    </div>
                </section>
            `;
        })
        .join('');
};

export const HorizontalScroller = ({ onMount, render }) => {
    onMount(({ element }) => {
        const buttons = element.querySelectorAll('.js-button');
        const destroy = horizontalScrollerAnimation({ buttons });

        return () => {
            destroy();
        };
    });

    const { caterpillarN1 } = getLegendData();
    const { title, description, type, source } = caterpillarN1;

    return render(/* HTML */ `<div class="l-h-scroller">
        <legend
            data-props="${createProps({
                title,
                description,
                type,
                source,
            })}"
        ></legend>
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
    </div>`);
};
