import { createNavigation } from './createNavigation';
import { navAccordion } from './navAccordion';

export const navigation = async () => {
    const { active } = await createNavigation();
    if (!active) return;
    navAccordion();
};
