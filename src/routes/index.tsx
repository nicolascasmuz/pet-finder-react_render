import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { App } from "../App";
import { MainPage } from "../pages/MainPage";
import { LogInPage } from "../pages/LogInPage";
import { SignUpPage } from "../pages/SignUpPage";
import { LocationPage } from "../pages/LocationPage";
import { HomePage } from "../pages/HomePage";
import { MyDataPage } from "../pages/MyDataPage";
import { EditPicPage } from "../pages/EditPicPage";
import { EditDataPage } from "../pages/EditDataPage";
import { EditPassPage } from "../pages/EditPassPage";
import { ReportedPetsPage } from "../pages/ReportedPetsPage";
import { NoReportedPetsPage } from "../pages/NoReportedPetsPage";
import { NewReportPage } from "../pages/NewReportPage";
import { EditReportPage } from "../pages/EditReportPage";
import { NewReportedPetPage } from "../pages/NewReportedPetPage";
import { FoundPetPage } from "../pages/FoundPetPage";
import { DeletedPetPage } from "../pages/DeletedPetPage";
import { MapPage } from "../pages/MapPage";
import { SelectedPetMapPage } from "../pages/SelectedPetMapPage";

export const indexRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/log-in",
        element: <LogInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/location",
        element: <LocationPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/my-data",
        element: <MyDataPage />,
      },
      {
        path: "/edit-pic",
        element: <EditPicPage />,
      },
      {
        path: "/edit-data",
        element: <EditDataPage />,
      },
      {
        path: "/edit-pass",
        element: <EditPassPage />,
      },
      {
        path: "/reported-pets",
        element: <ReportedPetsPage />,
      },
      {
        path: "/no-reported-pets",
        element: <NoReportedPetsPage />,
      },
      {
        path: "/new-report",
        element: <NewReportPage />,
      },
      {
        path: "/edit-report",
        element: <EditReportPage />,
      },
      {
        path: "/new-reported-pet",
        element: <NewReportedPetPage />,
      },
      {
        path: "/found-pet",
        element: <FoundPetPage />,
      },
      {
        path: "/deleted-pet",
        element: <DeletedPetPage />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/selected-pet-map",
        element: <SelectedPetMapPage />,
      },
    ],
  },
]);
