import { GetterTree } from 'vuex';
import { RootState } from '~/store';
import { State } from './avatars.models';

export const getters: GetterTree<State, RootState> = {
    eyes: state => {
        return state.faceParts.eyes;
    },
    mouths: state => {
        return state.faceParts.mouth;
    },
    noses: state => {
        return state.faceParts.nose;
    }
};