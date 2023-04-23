import { createProps } from '../../../../baseComponent/mainStore/actions/props';
import { getLegendData } from '../../../../route';
import { caterpillarN1Animation } from './animation/animation';

export const CaterpillarN1 = ({ onMount, render, props }) => {
    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');

        const destroyAnimation = caterpillarN1Animation({
            canvas,
            ...props,
        });

        return () => {
            destroyAnimation();
        };
    });

    const { caterpillarN1 } = getLegendData();
    const { title, description, type, source } = caterpillarN1;

    return render(/* HTML */ `
        <div>
            <legend
                data-props="${createProps({
                    title,
                    description,
                    type,
                    source,
                })}"
            ></legend>
            <div class="c-canvas">
                <div class="c-canvas__wrap">
                    <canvas></canvas>
                </div>
            </div>
        </div>
    `);
};
