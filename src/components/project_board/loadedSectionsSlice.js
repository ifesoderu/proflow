import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../utility";

export const openedSectionsSlice = createSlice({
    name: 'openedSections',
    initialState: {},
    reducers: {
        loadSections: {
            reducer: (state, action) => action.payload,
            prepare: (value) => { return ({ payload: arrayToObject(value, 'id') }) }
        },
        addNewSection: (state, action) => ({ ...state, [action.payload.id]: action.payload }),
        updateSectionTitle: (state, action) => ({ ...state, [action.payload.id]: action.payload })
    }
});

export const { loadSections, addNewSection, updateSectionTitle } = openedSectionsSlice.actions

export default openedSectionsSlice.reducer