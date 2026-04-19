import "./App.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import WelcomePage from "./screens/welcome";
import AboutPage from "./screens/about";
import CreateNewPetPage from "./screens/app/create-new-pet";
import HomeScreen from "./screens/app/home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: WelcomePage,
  },
  {
    path: "/adopt",
    Component: CreateNewPetPage,
  },
  {
    path: "/home",
    Component: HomeScreen,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
