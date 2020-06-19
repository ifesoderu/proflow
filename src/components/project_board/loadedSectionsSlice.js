import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../utility";

export const openedSectionsSlice = createSlice({
    name: 'openedSections',
    initialState: [],
    reducers: {
        loadSections: (state, action) => state = action.payload
    }
});

export const { loadSections } = openedSectionsSlice.actions

export default openedSectionsSlice.reducer