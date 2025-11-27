import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    settings: {},
    allSettings: [],
    loading: false,
    error: null
}

const settingsSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        setSettings: (state, action) => {
            state.settings = action.payload || {}
        },
        setAllSettings: (state, action) => {
            state.allSettings = action.payload || []
        },
        updateSetting: (state, action) => {
            const { key, value } = action.payload
            state.settings[key] = value
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        resetSettings: (state) => {
            state.settings = {}
            state.allSettings = []
            state.error = null
        }
    }
})

export const {
    setSettings,
    setAllSettings,
    updateSetting,
    setLoading,
    setError,
    resetSettings
} = settingsSlice.actions

export default settingsSlice.reducer
