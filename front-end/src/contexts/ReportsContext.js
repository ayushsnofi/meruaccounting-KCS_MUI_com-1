import React, { useReducer } from "react";
import {
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAILED,
} from "../constants/ReportsConstants";

export const reportsContext = React.createContext();

const getReportsReducer = (state, action) => {
  switch (action.type) {
    case GET_REPORTS_SUCCESS:
      return {
        ...state,
        loader: false,
        reports: action.payload,
        error: false,
      };
    case GET_REPORTS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export function ReportsProvider(props) {
  const [reports, dispatchGetReports] = useReducer(getReportsReducer, {
    loader: true,
    reports: [
      {
        byProjects: [
          {
            _id: { name: "testpro44", employee: "61fa2b321547fc2b4a9355a8" },
            actCount: 16,
            totalHours: 14926,
            avgPerformanceData: 64.34625,
          },
          {
            _id: { name: "project1", employee: "61e6e6bcf76dae033cb5b798" },
            actCount: 20,
            totalHours: 2289,
            avgPerformanceData: 66.75473684210526,
          },
          {
            _id: {
              name: "reportsProjectTEsting",
              employee: "61fd1897c3d8067aae2ad9af",
            },
            actCount: 40,
            totalHours: 6675,
            avgPerformanceData: 64.34774999999999,
          },
          {
            _id: {},
            actCount: 76,
            totalHours: 5341,
            avgPerformanceData: 63.011111111111106,
          },
          {
            _id: {
              name: "projectt333",
              employee: "61ebab6b4bf1d53170c5fad5",
            },
            actCount: 14,
            totalHours: 2700,
            avgPerformanceData: 56.826428571428565,
          },
        ],
        byClients: [
          {
            _id: {},
            actCount: 29,
            totalHours: 2299,
            avgPerformanceData: 62.77809523809523,
          },
          {
            _id: {
              firstName: "client 2",
              employee: "61e6e82af76dae033cb5b807",
            },
            actCount: 48,
            totalHours: 15135,
            avgPerformanceData: 70.35791666666667,
          },
          {
            _id: { firstName: "test2", employee: "61e6eacaf76dae033cb5b94c" },
            actCount: 49,
            totalHours: 7822,
            avgPerformanceData: 55.06116279069768,
          },
          {
            _id: {
              firstName: "reportsTesting",
              employee: "61fd1889c3d8067aae2ad8f2",
            },
            actCount: 40,
            totalHours: 6675,
            avgPerformanceData: 64.34774999999999,
          },
        ],
        byEmployees: [
          {
            _id: {
              firstName: "Bharat",
              employee: "61e6dd72eb3bd93227da0ba1",
              lastName: "Kumar",
            },
            actCount: 13,
            totalHours: 8514,
            avgPerformanceData: 58.08,
          },
          {
            _id: {
              firstName: "Ayush",
              employee: "61e6dd72eb3bd93227da0b9b",
              lastName: "Garg",
            },
            actCount: 121,
            totalHours: 9587,
            avgPerformanceData: 63.09796296296296,
          },
          {
            _id: {
              firstName: "Ayush",
              employee: "61e6dd72eb3bd93227da0b9d",
              lastName: "Dwivedi",
            },
            actCount: 21,
            totalHours: 9325,
            avgPerformanceData: 63.861000000000004,
          },
          {
            _id: {
              firstName: "Kamal",
              employee: "61e6dd72eb3bd93227da0b9f",
              lastName: "Singh",
            },
            actCount: 7,
            totalHours: 188,
            avgPerformanceData: 73.16428571428571,
          },
          {
            _id: {
              firstName: "Harnish",
              employee: "61e6dd72eb3bd93227da0ba3",
              lastName: "Shah",
            },
            actCount: 4,
            totalHours: 4317,
            avgPerformanceData: 69.5175,
          },
        ],
        byScreenshots: [
          {
            _id: "epoch converter - Google Search - Google Chrome",
            actCount: 1,
            totalHours: 310,
            avgPerformanceData: 77.1,
          },
          {
            _id: "Screen Monitor | Meru Accounting - Google Chrome",
            actCount: 24,
            totalHours: 40046,
            avgPerformanceData: 46.4675,
          },
          {
            _id: "New Tab - Google Chrome",
            actCount: 2,
            totalHours: 5012,
            avgPerformanceData: 48.32,
          },
          {
            _id: "activity.js - meruaccounting-KCS_MUI_com - Visual Studio Code",
            actCount: 5,
            totalHours: 35,
            avgPerformanceData: 88.8,
          },
          {
            _id: "ThrottledRowsGrid.js - kcs_mui - Visual Studio Code",
            actCount: 26,
            totalHours: 74074,
            avgPerformanceData: 57.447307692307696,
          },
          {
            _id: "GTA 5 RP Nopixel India | Healing Day :) | Ed Churan | !insta !discord - YouTube - Google Chrome",
            actCount: 6,
            totalHours: 20748,
            avgPerformanceData: 57,
          },
          {
            _id: "date - Convert seconds to HH-MM-SS with JavaScript? - Stack Overflow - Google Chrome",
            actCount: 3,
            totalHours: 7518,
            avgPerformanceData: 48.32,
          },
          {
            _id: "● ThrottledRowsGrid.js - kcs_mui - Visual Studio Code",
            actCount: 29,
            totalHours: 91464,
            avgPerformanceData: 56.164482758620686,
          },
          {
            _id: "Convert seconds to days, hours and minutes function - Google Search - Google Chrome",
            actCount: 1,
            totalHours: 2506,
            avgPerformanceData: 48.32,
          },
          {
            _id: "KC Screen Monitoring",
            actCount: 124,
            totalHours: 32600,
            avgPerformanceData: 65.31389830508475,
          },
          {
            _id: "Postman",
            actCount: 1,
            totalHours: 0,
            avgPerformanceData: 51.33,
          },
          {
            _id: "New notification",
            actCount: 7,
            totalHours: 5161,
            avgPerformanceData: 58.214285714285715,
          },
          {
            _id: "Epoch Converter - Unix Timestamp Converter - Google Chrome",
            actCount: 6,
            totalHours: 10644,
            avgPerformanceData: 57.913333333333334,
          },
          {
            _id: "package.json - app-main - Visual Studio Code",
            actCount: 1,
            totalHours: 513,
            avgPerformanceData: 28.27,
          },
          {
            _id: "GTA 5 RP Nopixel India | No Way Home xD | Ed Churan | !insta !discord - YouTube - Google Chrome",
            actCount: 14,
            totalHours: 17486,
            avgPerformanceData: 20.98,
          },
          {
            _id: "secret-channel - Discord",
            actCount: 1,
            totalHours: 450,
            avgPerformanceData: 68.89,
          },
          {
            _id: "epoch time difference in minutes - Google Search - Google Chrome",
            actCount: 1,
            totalHours: 310,
            avgPerformanceData: 77.1,
          },
          {
            _id: "2 minutes n epoch time - Google Search - Google Chrome",
            actCount: 1,
            totalHours: 310,
            avgPerformanceData: 77.1,
          },
          {
            _id: "Activity.js - meruaccounting-KCS_MUI_com - Visual Studio Code",
            actCount: 1,
            totalHours: 8,
            avgPerformanceData: 50,
          },
          {
            _id: "timeConverter.js - kcs_mui - Visual Studio Code",
            actCount: 1,
            totalHours: 2506,
            avgPerformanceData: 48.32,
          },
          {
            _id: "render.js - KCS_APP - Visual Studio Code",
            actCount: 4,
            totalHours: 318,
            avgPerformanceData: 81.2325,
          },
          {
            _id: "● SimpleContainer.js - kcs_mui - Visual Studio Code",
            actCount: 6,
            totalHours: 12719,
            avgPerformanceData: 50.40833333333333,
          },
          {
            _id: "1644296197671-1644296206466 - Google Search - Google Chrome",
            actCount: 1,
            totalHours: 157,
            avgPerformanceData: 70.7,
          },
          {
            _id: "Task Switching",
            actCount: 1,
            totalHours: 3458,
            avgPerformanceData: 57,
          },
          {
            _id: "Overview.js - kcs_mui - Visual Studio Code",
            actCount: 2,
            totalHours: 6916,
            avgPerformanceData: 57,
          },
          {
            _id: "seconds to days hours minutes seconds javascript Code Example - Google Chrome",
            actCount: 1,
            totalHours: 6571,
            avgPerformanceData: 65.33,
          },
          {
            _id: "(11) WhatsApp - Google Chrome",
            actCount: 1,
            totalHours: 3458,
            avgPerformanceData: 57,
          },
          {
            _id: "render.js - app-main - Visual Studio Code",
            actCount: 2,
            totalHours: 2506,
            avgPerformanceData: 74.16,
          },
          {
            _id: "SimpleContainer.js - kcs_mui - Visual Studio Code",
            actCount: 12,
            totalHours: 34137,
            avgPerformanceData: 49.737500000000004,
          },
        ],
      },
    ],

    error: false,
  });

  return (
    <reportsContext.Provider
      value={{
        reports,
        dispatchGetReports,
      }}
    >
      {props.children}
    </reportsContext.Provider>
  );
}
