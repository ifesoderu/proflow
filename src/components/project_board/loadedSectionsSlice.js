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
        updateSectionTitle: (state, action) => ({ ...state, [action.payload.id]: action.payload }),
        deleteSelectedSection: (state, action) => {
            let tempState = { ...state }
            delete tempState[action.payload.id]
            return { ...tempState }
        }
    }
});

export const { loadSections, addNewSection, deleteSelectedSection, updateSectionTitle } = openedSectionsSlice.actions

export default openedSectionsSlice.reducer