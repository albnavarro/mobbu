import { MobCore } from '@mobCore';

const { averageFPS } = await MobCore.useFps({ force: true, duration: 60 });
