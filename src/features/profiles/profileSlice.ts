import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "./types";

interface ProfileState {
  profiles: Profile[];
  draft: Profile | null;
  isEditing: boolean;
}

const createEmptyDraft = (): Profile => ({
  id: Date.now().toString(),
  fullName: "",
  email: "",
  age: "",
  address: {
    city: "",
    state: "",
    country: ""
  }
});

const initialState: ProfileState = {
  profiles: [],
  draft: null,
  isEditing: false
};

const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    startDraft(state) {
      state.draft = createEmptyDraft();
      state.isEditing = false;
    },

    editProfile(state, action: PayloadAction<string>) {
      const found = state.profiles.find(p => p.id === action.payload);
      if (found) {
        // Deep copy so Redux state doesn't mutate
        state.draft = JSON.parse(JSON.stringify(found));
        state.isEditing = true;
      }
    },

    updateDraft(state, action: PayloadAction<Partial<Profile>>) {
      if (state.draft) {
        state.draft = {
          ...state.draft,
          ...action.payload
        };
      }
    },

    updateAddress(
      state,
      action: PayloadAction<{ city: string; state: string; country: string }>
    ) {
      if (state.draft) {
        state.draft.address = action.payload;
      }
    },

    saveProfile(state) {
      if (!state.draft) return;

      if (state.isEditing) {
        const index = state.profiles.findIndex(
          p => p.id === state.draft?.id
        );
        if (index !== -1) {
          state.profiles[index] = state.draft;
        }
      } else {
        state.profiles.push(state.draft);
      }

      state.draft = null;
      state.isEditing = false;
    },

    deleteProfile(state, action: PayloadAction<string>) {
      state.profiles = state.profiles.filter(
        p => p.id !== action.payload
      );
    }
  }
});

export const {
  startDraft,
  editProfile,
  updateDraft,
  updateAddress,
  saveProfile,
  deleteProfile
} = profileSlice.actions;

export default profileSlice.reducer;
