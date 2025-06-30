import { MobJs } from '@mobJs';

MobJs.loadUrl({ url: 'my-route' });

/**
 * Add params in url
 */
MobJs.loadUrl({ url: 'my-route?param1=value&param2=value' });

/**
 * Add params with object
 */
MobJs.loadUrl({
    url: 'my-route',
    params: {
        param1: 'value',
        param2: 'value',
    },
});

/**
 * Override page transition
 */
MobJs.loadUrl({
    url: 'my-route',
    skipTransition: true,
});
