import { createStore } from "effector";


export const $state = createStore<'start' | 'ingame' | 'won'>('ingame');