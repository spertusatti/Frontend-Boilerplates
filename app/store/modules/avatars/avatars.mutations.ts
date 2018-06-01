import { MutationTree } from 'vuex';
import { State, AvatarsFace } from './avatars.models';

export const enum AvatarsMutation {
    SET_FACE = 'SET_FACE'
}

export const mutations: MutationTree<State> = {
    [AvatarsMutation.SET_FACE]: (state: State, face: AvatarsFace) => {
        state.faceParts = face;
    }
};