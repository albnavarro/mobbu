import { WithSource } from '@mobJsType';
import { accessibilityStore } from '@stores/accessibility/type';

export interface AccessibilityButtonType {
    bindStore: WithSource<accessibilityStore>;
}
