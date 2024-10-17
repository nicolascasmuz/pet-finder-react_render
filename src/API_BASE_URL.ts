var API_BASE_URL: any = "";

if (process.env.REACT_APP_ENV == "development") {
  API_BASE_URL = "http://localhost:3000";
} else if (process.env.REACT_APP_ENV == "production") {
  API_BASE_URL = process.env.BACKEND_URL;
}

export { API_BASE_URL };
