import { useState, useEffect } from "react";
import { ThemeToggle } from "./components/ui-theme/theme-toggle";
import { tauri } from "@tauri-apps/api";
import { ask } from "@tauri-apps/api/dialog";
import { sendNotification } from "@tauri-apps/api/notification";
import { Input } from "./components/ui/input";
import { Backend_log } from "./cases/backend_log";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";
import { ControlButtons } from "./components/app/control-buttons";
import { Relogio } from "./components/app/relogio";

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

  return (
    <main
      id="main"
      className="antialiased w-[300px] h-[300px] flex flex-col justify-center items-center p-4 border rounded-md z-10"
    >
      <Relogio isRunning={isRunning} handleChange={handleChange} timer={timer} />
      <ControlButtons 
        isRunning={isRunning} 
        handleStart={handleStart} 
        handlePause={handlePause} 
        handleStop={handleStop} 
        handleExit={handleExit}
      />
    </main>
  );
}

export default App;
