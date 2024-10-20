import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    showSidebar: false,
    showMobileMenu: false,
    showFilterDrawer: false,
    showSearchDrawer: false
  },
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    toggleMobileMenu: (state) => {
      state.showMobileMenu = !state.showMobileMenu
    },
    toggleFilterDrawer: (state) => {
      state.showFilterDrawer = !state.showFilterDrawer
    },
    toggleSearchDrawer: (state) => {
      state.showSearchDrawer = !state.showSearchDrawer
    }
  }
});

export const { toggleSidebar, toggleMobileMenu, toggleFilterDrawer, toggleSearchDrawer } = sidebarSlice.actions;

export default sidebarSlice.reducer;