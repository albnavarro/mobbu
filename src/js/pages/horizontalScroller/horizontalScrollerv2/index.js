import { staticProps } from '../../../mobjs';

export const horizontalScrollerV2 = () => {
    return /* HTML */ `<div>
        <horizontal-scroller
            ${staticProps({ animatePin: true })}
        ></horizontal-scroller>
    </div>`;
};
