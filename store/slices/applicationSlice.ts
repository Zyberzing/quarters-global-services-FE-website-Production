import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid4 from "uuid4";

/* =======================
   TYPES
======================= */

export interface AddonItem {
  id: string;
  name: string;
  price: number;
  currency: string;
}

export interface Application {
  id: string;
  type: string;
  name: string | null;
  price?: number | null;
  package: string | null;

  // ✅ REQUIRED FOR ADDITIONAL SERVICES / CHECKOUT
  toCountrySlug: string | null;

  platformServiceCategoryId: string | null;
  platformServiceCategoryPackageId: string | null;
  platformServiceId: string | null;

  addons: AddonItem[];
  form: Record<string, any>;
}

interface ApplicationState {
  applications: Application[];
  draftApplications: Application[];
  activeId: string | null;
}

/* =======================
   STORAGE HELPERS
======================= */

const STORAGE_KEY = "applications";
const STATUS_KEY = "applicationStatus";

const saveState = (state: ApplicationState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { }
};

export const saveSingleApplication = (app: Application) => {
  try {
    localStorage.setItem(
      STATUS_KEY,
      JSON.stringify({
        activeId: app.id,
        data: app,
      })
    );
  } catch { }
};

/* =======================
   LOAD STATE (SAFE)
======================= */

const loadState = (): ApplicationState => {
  try {
    const statusRaw = localStorage.getItem(STATUS_KEY);
    const appsRaw = localStorage.getItem(STORAGE_KEY);

    let state: ApplicationState = {
      applications: [],
      draftApplications: [],
      activeId: null,
    };

    if (appsRaw) {
      state = JSON.parse(appsRaw);
    }

    if (statusRaw) {
      const parsed = JSON.parse(statusRaw);
      if (parsed?.data) {
        const idx = state.draftApplications.findIndex(
          (a) => a.id === parsed.data.id
        );

        if (idx !== -1) {
          state.draftApplications[idx] = parsed.data;
        } else {
          state.draftApplications.push(parsed.data);
        }

        state.activeId = parsed.activeId;
      }
    }

    return state;
  } catch {
    return { applications: [], draftApplications: [], activeId: null };
  }
};

const initialState: ApplicationState = loadState();

/* =======================
   SLICE
======================= */

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    /* -------- START APPLICATION -------- */
    startApplication(
      state,
      action: PayloadAction<{
        type: string;
        platformServiceId: string;
        toCountrySlug: string;
      }>
    ) {
      const id = uuid4();

      const app: Application = {
        id,
        type: action.payload.type,
        name: null,
        price: null,
        package: null,
        toCountrySlug: action.payload.toCountrySlug, // ✅ FIXED
        addons: [],
        form: {},
        platformServiceCategoryId: null,
        platformServiceCategoryPackageId: null,
        platformServiceId: action.payload.platformServiceId,
      };

      state.draftApplications.push(app);
      state.activeId = id;
      saveSingleApplication(app);
    },

    /* -------- ACTIVE APPLICATION -------- */
    setActiveApplication(state, action: PayloadAction<string>) {
      state.activeId = action.payload;
    },

    /* -------- CATEGORY -------- */
    setCategory(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        platformServiceCategoryId: string;
      }>
    ) {
      const app = state.draftApplications.find(
        (a) => a.id === action.payload.id
      );

      if (app) {
        app.name = action.payload.name;
        app.platformServiceCategoryId =
          action.payload.platformServiceCategoryId;
        saveSingleApplication(app);
      }
    },

    /* -------- PACKAGE -------- */
    setPackage(
      state,
      action: PayloadAction<{
        id: string;
        package: string;
        price: string;
        platformServiceCategoryId: string;
        platformServiceCategoryPackageId: string;
        platformServiceId: string;
      }>
    ) {
      const app = state.draftApplications.find(
        (a) => a.id === action.payload.id
      );

      if (app) {
        app.package = action.payload.package;
        app.price = Number(action.payload.price);
        app.platformServiceCategoryId =
          action.payload.platformServiceCategoryId;
        app.platformServiceCategoryPackageId =
          action.payload.platformServiceCategoryPackageId;
        app.platformServiceId = action.payload.platformServiceId;

        saveSingleApplication(app);
      }
    },

    /* -------- COUNTRY UPDATE -------- */
    setCountry(
      state,
      action: PayloadAction<{ id: string; toCountrySlug: string }>
    ) {
      const app = state.draftApplications.find(
        (a) => a.id === action.payload.id
      );

      if (app) {
        app.toCountrySlug = action.payload.toCountrySlug;
        saveSingleApplication(app);
      }
    },

    /* -------- ADDON MANAGEMENT -------- */
    addAddon(
      state,
      action: PayloadAction<{ id: string; addon: AddonItem }>
    ) {
      const app = state.draftApplications.find(
        (a) => a.id === action.payload.id
      );

      if (app && !app.addons.some((a) => a.id === action.payload.addon.id)) {
        app.addons.push(action.payload.addon);
        saveSingleApplication(app);
      }
    },

    removeAddon(
      state,
      action: PayloadAction<{ id: string; addonId: string }>
    ) {
      const app = state.draftApplications.find(
        (a) => a.id === action.payload.id
      );

      if (app) {
        app.addons = app.addons.filter(
          (a) => a.id !== action.payload.addonId
        );
        saveSingleApplication(app);
      }
    },

    /* -------- FORM DATA -------- */
    setFormData(
      state,
      action: PayloadAction<{ id: string; form: Record<string, any> }>
    ) {
      const app = state.draftApplications.find(
        (a) => a.id === action.payload.id
      );

      if (app) {
        app.form = { ...app.form, ...action.payload.form };
        saveSingleApplication(app);
        saveState(state);
      }
    },

    /* -------- SAVE FINAL APPLICATION -------- */
    saveApplication(state) {
      state.applications = state.draftApplications.filter(
        (a) => a.package
      );
      saveState(state);
    },

    /* -------- CLEAR TEMP STATUS -------- */
    clearStatus() {
      localStorage.removeItem(STATUS_KEY);
    },

    /* -------- RESET (DEV / LOGOUT) -------- */
    resetApplications() {
      return { applications: [], draftApplications: [], activeId: null };
    },

    finalizeApplication(
      state,
      action: PayloadAction<{ id: string }>
    ) {
      const app = state.draftApplications.find(
        (a) => a.id === action.payload.id
      );

      if (!app) return;

      // ✅ avoid duplicate final save
      const alreadySaved = state.applications.some(
        (a) => a.id === app.id
      );

      if (!alreadySaved) {
        state.applications.push({
          ...app,
        });
      }

      // ✅ KEEP draft (no removal)
      // ❌ do NOT filter draftApplications

      // ✅ keep activeId unchanged
      state.activeId = app.id;

      saveState(state);
    },

    /* -------- DELETE APPLICATION -------- */
    deleteApplication(state, action: PayloadAction<string>) {
      const id = action.payload;

      state.draftApplications = state.draftApplications.filter(
        (a) => a.id !== id
      );
      state.applications = state.applications.filter(
        (a) => a.id !== id
      );

      if (state.activeId === id) {
        state.activeId = state.draftApplications[0]?.id || null;
      }

      saveState(state);

      const raw = localStorage.getItem(STATUS_KEY);
      if (raw && JSON.parse(raw)?.activeId === id) {
        localStorage.removeItem(STATUS_KEY);
      }
    },
  },
});

/* =======================
   EXPORTS
======================= */

export const {
  startApplication,
  setCategory,
  setPackage,
  setCountry,
  setFormData,
  resetApplications,
  saveApplication,
  clearStatus,
  setActiveApplication,
  deleteApplication,
  addAddon,
  removeAddon,
  finalizeApplication
} = applicationSlice.actions;

export default applicationSlice.reducer;
