export interface State {
    pitch: number;
    roll: number;
    yaw: number;
    speed: { x: number, y: number, z: number };
    temperature: { low: number, high: number };
    tof: number;
    height: number;
    battery: number;
    barometer: number;
    time: number;
    acceleration: { x: number, y: number, z: number };
}
