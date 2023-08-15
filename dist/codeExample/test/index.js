import { staticProps } from '<path>/baseComponent/mainStore/actions/props';
import { getLegendData } from '<path>/route';
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

    const { caterpillarN1: sourceProps } = getLegendData();
    const { title, description, type, source } = sourceProps;

    return render(/* HTML */ `
        <div>
            <legend
                data-staticprops="${staticProps({
                    title,
                    description,
                    type,
                    source,
                })}"
            ></legend>
            <div class="caterpillar-canvas">
                <div class="caterpillar-canvas__wrap">
                    <canvas></canvas>
                </div>
            </div>
        </div>
    `);
};
