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
      <div id="navbar" className="p-2 m-2 flex flex-row justify-between items-center">
        <h2>
          Tauri + Vite + Shadcn
        </h2>
        <ThemeToggle/>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1>{greetMsg}</h1>
        <form onSubmit={greet} className="flex flex-col">
          <Input className="m-2 w-[200px]" placeholder="Digite seu nome:" onChange={(event) => setName(event.target.value)}/>
          <Button className="m-2 w-[200px]" type="submit">Click-me</Button>
        </form>
      </div>

    </main>
  );
}

export default App;
