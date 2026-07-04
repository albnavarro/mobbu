import { WithSource } from '@mobJsType';
import { MqStore } from '@stores/mq/type';

export interface HomeComponent {
    props: {
        svg: SVGElement[];
    };
    state: {
        isMounted: boolean;
    };
    bindStore: WithSource<MqStore>;
}
