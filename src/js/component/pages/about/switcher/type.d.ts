import { WithSource } from '@mobJsType';
import { MqStore } from '@stores/mq/type';

export interface AboutSwitcher {
    props: {
        block_1: {
            titleTop: string;
            titleBottom: string;
        };
        block_2: {
            title: string;
            copy: string;
        };
        block_3: {
            title: string;
            copy: string;
        };
        block_4: {
            title: string;
            items: string[];
        };
        mobileSvg: string;
        tabletSvg: string;
    };
    bindStore: WithSource<MqStore>;
}
