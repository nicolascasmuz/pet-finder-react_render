import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { dataAtom } from "./atoms/data-atoms";

import { indexRouter } from "./routes/index";

let root = createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot
    initializeState={({ set }) => {
      try {
        const savedState = localStorage.getItem("saved-state");
        if (savedState) {
          set(dataAtom, JSON.parse(savedState));
        }
      } catch (error) {
        console.error("Error al inicializar el estado de Recoil: ", error);
      }
    }}
  >
    <React.StrictMode>
      <RouterProvider router={indexRouter} />
    </React.StrictMode>
  </RecoilRoot>
);
