import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
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
    path: "/create-new-pet",
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
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;
