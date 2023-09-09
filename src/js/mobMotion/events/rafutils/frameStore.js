// @ts-check

import { mobCore } from '../../../mobCore/index.js';
import { handleSetUp } from '../../setup.js';
import { NOOP } from '../../utils/functionsUtils.js';

export const frameStore = mobCore.createStore({
    currentFrame: 0,
    instantFps: handleSetUp.get('startFps'),
    requestFrame: NOOP,
});
