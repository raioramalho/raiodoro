import { useState, useEffect } from "react";
import { ThemeToggle } from "./components/ui-theme/theme-toggle";
import { Button } from "./components/ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";
import { ExitIcon, StopIcon } from "@radix-ui/react-icons";
import { tauri } from "@tauri-apps/api";
import { ask } from "@tauri-apps/api/dialog";

function App() {
  const [timer, setTimer] = useState("00:00");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        const [hours, minutes] = timer.split(":").map(Number);
        let newMinutes = minutes - 1;
        let newHours = hours;
        if (newMinutes < 0) {
          if (newHours > 0) {
            newHours--;
            newMinutes = 59;
          } else {
            setIsRunning(false);
            clearInterval(interval);
            return;
          }
        }
        setTimer(
          `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(
            2,
            "0"
          )}`
        );
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, isRunning]);

  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
    setTimer(timer);
  }

  async function handleStop() {
    await ask("Deseja zerar o timer?", "Raio⚡️Doro")
      .then((res) => {
        console.log(res);
        setIsRunning(false);
        setTimer("00:00");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleExit() {
    await ask("Deseja mesmo fechar o pomodoro?", "Raio⚡️Doro")
      .then((res) => {
        console.log(res);
        tauri.invoke("exit_app", {});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange(e:any) {
    const value = e.target.value;
    if (/^\d{0,2}:\d{0,2}$/.test(value) || value === "") {
      setTimer(value);
    }
  }

  function StartButton() {
    return (
      <Button onClick={handleStart} variant={"outline"} className="gap-1">
        <PlayIcon className="w-4 h-4" />
        start
      </Button>
    );
  }

  function PauseButton() {
    return (
      <Button onClick={handlePause} variant={"outline"} className="gap-1">
        <PauseIcon className="w-4 h-4" />
        pause
      </Button>
    );
  }

  function StopButton() {
    return (
      <Button
        onClick={handleStop}
        variant={"outline"}
        className="gap-1"
        disabled={isRunning}
      >
        <StopIcon className="w-4 h-4" />
        stop
      </Button>
    );
  }

  return (
    <main
      id="main"
      className="w-[300px] h-[300px] flex flex-col justify-center items-center p-4 border rounded-md z-10"
    >
      <div
        id="timer-div"
        className="w-[200px] h-[200px] border-2 rounded-full flex flex-col justify-center items-center"
      >
        <ThemeToggle />
        <input
          onChange={handleChange}
          readOnly={isRunning}
          className="text-6xl w-[165px] focus:border-none focus:outline-none z-0"
          value={timer}
        />
      </div>
      <div
        id="control-div"
        className="flex flex-row justify-center items-center gap-1 mt-4"
      >
        {isRunning ? <PauseButton /> : <StartButton />}
        <StopButton />
        <Button onClick={handleExit} variant={"destructive"} className="gap-1">
          <ExitIcon className="w-4 h-4" />
          exit
        </Button>
      </div>
    </main>
  );
}

export default App;
