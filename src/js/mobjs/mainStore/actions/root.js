import { mainStore } from '../mainStore';

export const setRoot = ({ root = document.createElement('div') }) => {
    mainStore.set('root', root);
};

export const getRoot = () => {
    const { root } = mainStore.get();
    return root;
};
