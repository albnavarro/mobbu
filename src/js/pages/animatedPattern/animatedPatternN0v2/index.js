import { staticProps } from '../../../mobjs';

export const animatedPatternN0v2 = () => {
    return /* HTML */ `<div class="l-padding">
        <AnimatedPatternN0
            data-staticprops=${staticProps({
                fill: [
                    0, 13, 20, 45, 65, 71, 72, 73, 74, 75, 76, 77, 83, 92, 96,
                    113, 117, 134, 138, 155, 156, 157, 158, 159, 189, 209,
                ],
                gutter: 1,
                numberOfColumn: 20,
                numberOfRow: 10,
                cellWidth: 50,
                cellHeight: 50,
                stagger: {
                    each: 2,
                    from: 'random',
                    waitComplete: false,
                },
                reorder: false,
            })}
        ></AnimatedPatternN0>
    </div>`;
};
