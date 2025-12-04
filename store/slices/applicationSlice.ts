import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid4 from "uuid4";

export interface Application {
  id: string;
  type: string;
  name: string | null;
  price?: number | null;
  package: string | null;
  platformServiceCategoryId: string | null;
  platformServiceCategoryPackageId: string | null;
  platformServiceId: string | null;
  addons: string[];
  form: Record<string, any>;
}

interface ApplicationState {
  applications: Application[];
  activeId: string | null; // which one user is working on
}

const STORAGE_KEY = "applications";

const saveState = (state: ApplicationState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state", e);
  }
};
const STATUS_KEY = "applicationStatus";
export const saveSingleApplication = (app: Application) => {

  console.log(app, "appDa6a")
  try {
    localStorage.setItem(
      STATUS_KEY,
      JSON.stringify({
        activeId: app.id,
        data: app,
      })
    );
  } catch (err) {
    console.error("Failed to save single application:", err);
  }
};

const loadState = (): ApplicationState => {
  try {
    const currentStatusData = localStorage.getItem(STATUS_KEY);
    const applicationsData = localStorage.getItem(STORAGE_KEY);

    const parsedApplications: ApplicationState = applicationsData
      ? JSON.parse(applicationsData)
      : { applications: [], activeId: null };

    // If a single application is saved, merge it into the existing array
    if (currentStatusData) {
      const parsedStatus = JSON.parse(currentStatusData);

      if (parsedStatus?.data) {
        const existingAppIndex = parsedApplications.applications.findIndex(
          (a) => a.id === parsedStatus.data.id
        );

        if (existingAppIndex !== -1) {
          // Update existing application (replace old version)
          parsedApplications.applications[existingAppIndex] = parsedStatus.data;
        } else {
          // Append new application if not already present
          parsedApplications.applications.push(parsedStatus.data);
        }

        // Update active ID from the latest single app
        parsedApplications.activeId = parsedStatus.activeId || parsedApplications.activeId;
      }
    }

    return parsedApplications;
  } catch (e) {
    console.error("Failed to load state", e);
    return { applications: [], activeId: null };
  }
};


const initialState: ApplicationState = loadState();

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    startApplication(state, action: PayloadAction<{ type: string }>) {
      const id = uuid4();
      console.log(action.payload.type, "app")
      const newApp: Application = {
        id,
        type: action.payload.type,
        name: null,
        package: null,
        addons: [],
        form: {},
        platformServiceCategoryId: null,
        platformServiceCategoryPackageId: null,
        platformServiceId: null,
      };
      state.applications.push(newApp);
      state.activeId = id;
      saveSingleApplication(newApp);
    },

    setCategory(
      state,
      action: PayloadAction<{ id: string; name: string; platformServiceCategoryId: string }>
    ) {
      const app = state.applications.find((a) => a.id === action.payload.id);
      if (app) {
        app.name = action.payload.name;
        app.platformServiceCategoryId = action.payload.platformServiceCategoryId;
        saveSingleApplication(app);
      }
    },

    setPackage(
      state,
      action: PayloadAction<{
        id: string;
        platformServiceCategoryId: string;
        package: string;
        platformServiceCategoryPackageId: string;
        platformServiceId: string;
        price: string;
      }>
    ) {
      const app = state.applications.find((a) => a.id === action.payload.id);
      console.log(app, "app")
      if (app) {
        app.package = action.payload.package;
        app.platformServiceCategoryPackageId = action.payload.platformServiceCategoryPackageId;
        app.platformServiceId = action.payload.platformServiceId;
        app.platformServiceCategoryId = action.payload.platformServiceCategoryId;
        saveSingleApplication(app);
      }
    },

    addAddon(state, action: PayloadAction<{ id: string; addon: string }>) {
      const app = state.applications.find((a) => a.id === action.payload.id);
      if (app && !app.addons.includes(action.payload.addon)) {
        app.addons.push(action.payload.addon);
        saveSingleApplication(app);
      }
    },

    setFormData(state, action: PayloadAction<{ id: string; form: Record<string, any> }>) {
      const app = state.applications.find((a) => a.id === action.payload.id);

      if (app) {
        // ✅ Deep merge safety
        app.form = {
          ...app.form,
          ...action.payload.form,
          applications: action.payload.form.applications || app.form.applications,
        };
        saveState(state);
        saveSingleApplication(app);
      }
    },

    saveApplication(state) {
      saveState(state);
    },

    clearStatus() {
      try {
        localStorage.removeItem(STATUS_KEY);
      } catch (err) {
        console.error("Failed to clear status:", err);
      }
    },

    // ✅ Optional: reset all (for debugging/testing)
    resetApplications() {
      return { applications: [], activeId: null };
    },
  },
});

export const { startApplication, setCategory, setPackage, addAddon, setFormData, resetApplications, saveApplication, clearStatus } =
  applicationSlice.actions;

export default applicationSlice.reducer;
