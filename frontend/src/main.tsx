import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.ts";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/userRoutes.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster richColors closeButton position="top-right" />
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <RouterProvider router={appRouter} />
      </StrictMode>
    </PersistGate>
  </Provider>
);
