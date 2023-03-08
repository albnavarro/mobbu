import { navigation } from './createNavigation';
import { navAccordion } from './navAccordion';

export const createNavigation = async () => {
    const { active } = await navigation();
    if (!active) return;
    navAccordion();
};
