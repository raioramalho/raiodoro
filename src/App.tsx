import { useState, useEffect } from "react";
import { ThemeToggle } from "./components/ui-theme/theme-toggle";
import { Button } from "./components/ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";
import { ExitIcon, StopIcon } from "@radix-ui/react-icons";
import { tauri } from "@tauri-apps/api";
import { ask } from "@tauri-apps/api/dialog";
import { sendNotification } from "@tauri-apps/api/notification";
import { Input } from "./components/ui/input";
import { Backend_log } from "./cases/backend_log";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";

function App() {
  async function request_permission() {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }
  }

  request_permission();

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

            sendNotification({
              title: `O tempo acabou!!`,
              body: `Tire seu descanso, e retorne para o seu foco!`,
              sound: "default",
            });

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
      .then((res: boolean) => {
        if (res) {
          Backend_log("User selected stop timer.");
          setIsRunning(false);
          setTimer("00:00");
        }
        Backend_log("User selected don't stop timer.");
      })
      .catch((err) => {
        Backend_log(`${JSON.stringify(err)}`);
      });
  }

  async function handleExit() {
    Backend_log("Send ask for the user.");
    await ask("Deseja mesmo fechar o pomodoro?", "Raio⚡️Doro")
      .then((res) => {
        res
          ? tauri.invoke("exit_app", {})
          : Backend_log("User selected don't close.");
      })
      .catch((err) => {
        Backend_log(`${JSON.stringify(err)}`);
      });
  }

  function handleChange(e: any) {
    const value = e.target.value;
    if (/^\d{0,2}:\d{0,2}$/.test(value) || value === "") {
      setTimer(value);
    }
  }

  function StartButton() {
    return (
      <Button onClick={handleStart} variant={"outline"} className="gap-1">
        <PlayIcon className="w-4 h-4" />
        Start
      </Button>
    );
  }

  function PauseButton() {
    return (
      <Button onClick={handlePause} variant={"outline"} className="gap-1">
        <PauseIcon className="w-4 h-4" />
        Pause
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
        Stop
      </Button>
    );
  }

  return (
    <main
      id="main"
      className="antialiased w-[300px] h-[300px] flex flex-col justify-center items-center p-4 border rounded-md z-10"
    >
      <div
        id="timer-div"
        className="w-[200px] h-[200px] border-2 rounded-full flex flex-col justify-center items-center"
      >
        <ThemeToggle />
        <Input
          onChange={handleChange}
          readOnly={isRunning}
          className="ml-2 text-6xl w-[165px] border-none outline-none focus:border-none focus:outline-none z-0"
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
          Exit
        </Button>
      </div>
    </main>
  );
}

export default App;
