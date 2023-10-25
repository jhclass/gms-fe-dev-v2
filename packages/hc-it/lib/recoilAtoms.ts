import { atom } from 'recoil';

export const countdownState = atom<number>({
    key: 'countdownState',
    default: 0, // 초 단위
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

export const asideHiddenState = atom<boolean>({
    key: 'asideHiddenState',
    default: true,
});

export const isMenuOpenState = atom<boolean>({
    key: 'isMenuOpenState',
    default: false,
});

export const groupSelectedState = atom<string[]>({
    key: 'groupSelectedState',
    default: [],
});