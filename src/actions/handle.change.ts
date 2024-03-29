export default function handleChange(e: any, setTimer: any) {
  const value = e.target.value;
  if (/^\d{0,2}:\d{0,2}$/.test(value) || value === "") {
    setTimer(value);
  }
}
