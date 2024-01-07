import { loadUrl } from '../mobjs';

loadUrl({ url: 'my-route' });

/**
 * Add params
 */
loadUrl({ url: 'my-route?param1=value&param2=value' });
