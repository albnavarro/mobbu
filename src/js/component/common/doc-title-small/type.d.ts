import { DocContainerStore } from '@stores/doc-container/type';
import { WithSource } from '@mobJsType';

export interface DocTitle {
    bindStore: WithSource<DocContainerStore>;
}
