import { staticProps } from '../../../mobjs';

export const horizontalScrollerModuleV2 = () => {
    return /* HTML */ `<div>
        <HorizontalScroller
            data-staticprops="${staticProps({
                animatePin: true,
            })}"
        ></HorizontalScroller>
    </div>`;
};
