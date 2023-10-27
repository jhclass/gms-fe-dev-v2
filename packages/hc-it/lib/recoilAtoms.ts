import { atom } from 'recoil';

export const countdownState = atom<number>({
    key: 'countdownState',
    default: 0, // 초 단위
});

export const topbnrHiddenState = atom<boolean>({
    key: 'topbnrHiddenState',
    default: false,
});

export const headerFixedState = atom<boolean>({
    key: 'headerFixedState',
    default: false,
});

export const moMenuOpenState = atom<boolean>({
    key: 'moMenuOpenState',
    default: false,
});

export const detailBottomHiddenState = atom<boolean>({
    key: 'detailBottomHiddenState',
    default: false,
});

export const detailTopbnrHiddenState = atom<boolean>({
    key: 'detailTopbnrHiddenState',
    default: false,
});

export const detailTopbnrFixedState = atom<boolean>({
    key: 'detailTopbnrFixedState',
    default: false,
});

export const asideHiddenState = atom<boolean>({
    key: 'asideHiddenState',
    default: true,
});

export const moAsideOpenState = atom<boolean>({
    key: 'moAsideOpenState',
    default: false,
});

export const moMenuTabState = atom<number>({
    key: 'moAsideOpenState',
    default: 0,
});


export const isMenuOpenState = atom<boolean>({
    key: 'isMenuOpenState',
    default: false,
});

export const formGroupSelectedState = atom<string[]>({
    key: 'formGroupSelectedState',
    default: [],
});
