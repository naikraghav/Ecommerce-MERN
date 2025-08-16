import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx"; // your router setup file
import "./index.css";
import "./App.css"; // custom styles
import {Provider} from "react-redux";
import { store } from './store/store';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
