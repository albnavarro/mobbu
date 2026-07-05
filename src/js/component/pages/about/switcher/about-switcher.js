/**
 * @import {MobComponent} from '@mobJsType'
 */

import { htmlObject } from '@mobJs';
import { AboutComponent } from '../tablet/definition';
import { AboutMobileComponent } from '../mobile/definition';

/** @type {MobComponent<import('./type').AboutSwitcher>} */
export const AboutSwitcherFunction = ({
    invalidate,
    staticProps,
    getBoundedProxi,
    getProxi,
}) => {
    const boundedProxi = getBoundedProxi();
    const proxi = getProxi();

    return htmlObject({
        content: invalidate({
            observe: () => boundedProxi.fromTablet,
            render: () => {
                return boundedProxi.fromTablet
                    ? htmlObject({
                          component: AboutComponent,
                          modules: staticProps(
                              /** @type {import('../tablet/type').About['props']} */
                              ({
                                  block_1: proxi.block_1,
                                  block_2: proxi.block_2,
                                  block_3: proxi.block_3,
                                  block_4: proxi.block_4,
                                  svg: proxi.tabletSvg,
                              })
                          ),
                      })
                    : htmlObject({
                          component: AboutMobileComponent,
                          modules: staticProps(
                              /** @type {import('../mobile/type').AboutMobile['props']} */
                              ({
                                  block_1: proxi.block_1,
                                  block_2: proxi.block_2,
                                  block_3: proxi.block_3,
                                  block_4: proxi.block_4,
                                  svg: proxi.mobileSvg,
                              })
                          ),
                      });
            },
        }),
    });
};
