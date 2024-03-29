import { useState, useEffect } from "react";
import { sendNotification } from "@tauri-apps/api/notification";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";
import { ControlButtons } from "./components/app/control-buttons";
import { Relogio } from "./components/app/relogio";
import handleStart from "./actions/handle.start";
import handleStop from "./actions/handle.stop";
import handlePause from "./actions/handle.pause";
import handleExit from "./actions/handle.exit";
import handleChange from "./actions/handle.change";
import { ShortI } from "./cases/short_i";
import ShortK from "./cases/short_k";
import { ShortP } from "./cases/short_p";

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

  ShortI(setIsRunning);
  ShortP(setIsRunning, setTimer, timer);
  ShortK(setIsRunning, setTimer);

  return (
    <main
      id="main"
      className="antialiased w-[300px] h-[300px] flex flex-col justify-center items-center p-4 border rounded-md z-10"
    >
      <Relogio
        isRunning={isRunning}
        handleChange={(e: any) => {
          handleChange(e, setTimer);
        }}
        timer={timer}
      />

      <ControlButtons
        timer={timer}
        isRunning={isRunning}
        handleStart={() => {
          handleStart(setIsRunning);
        }}
        handlePause={() => {
          handlePause(setIsRunning, setTimer, timer);
        }}
        handleStop={() => {
          handleStop(setIsRunning, setTimer);
        }}
        handleExit={() => {
          handleExit();
        }}
      />
    </main>
  );
}

export default App;
