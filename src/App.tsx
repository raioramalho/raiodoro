import { invoke } from "@tauri-apps/api/tauri";

import "./App.css";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { ThemeToggle } from "./components/ui-theme/theme-toggle";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet(e: any) {
    e.preventDefault()
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
    let data = await invoke("say_the_date", {});
    console.log(data);
  }

  return (
    <main id="main" className="flex flex-col">
      <h2>RaioPomo</h2> 
    </main>
  );
}

export default App;
