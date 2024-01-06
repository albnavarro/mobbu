import { loadUrl } from '../mobjs';

loadUrl({ url: 'my-route' });

/**
 * Add params
 */
loadUrl({ url: '?param1=10&param2=1#my_route' });
