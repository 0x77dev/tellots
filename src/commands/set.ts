import commander from "../exchanger"

const speed = (speed: number) => commander.send(`speed ${speed}`)

const rc = (x: number, y: number, z: number, yaw: number) => commander.send(`rc ${x} ${y} ${z} ${yaw}`)

const wifi = (ssid: string, password: string) => commander.send(`wifi ${ssid} ${password}`)

export const set = { speed, rc, wifi };
export default set;
