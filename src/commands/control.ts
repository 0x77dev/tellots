const commander = require('../exchanger')

const connect = () => commander.send('command')

const takeOff = () => commander.send('takeoff')

const land = () => commander.send('land')

const emergency = () => commander.send('emergency')

const stop = () => commander.send('stop')

const flip = (side: "l" | "r" | "b" | "f") => commander.send(`flip ${side}`)

const up = (distance: number) => commander.send(`up ${distance}`)

const down = (distance: number) => commander.send(`down ${distance}`)

const left = (distance: number) => commander.send(`left ${distance}`)

const right = (distance: number) => commander.send(`right ${distance}`)

const front = (distance: number) => commander.send(`forward ${distance}`)

const back = (distance: number) => commander.send(`back ${distance}`)

const clockwise = (angle: number) => commander.send(`cw ${angle}`)

const counterClockwise = (angle: number) => commander.send(`ccw ${angle}`)

const go = (end: { x: number, y: number, z: number }, speed: number) => commander.send(`go ${end.x} ${end.y} ${end.z} ${speed}`)

const curve = (start: { x: number, y: number, z: number }, end: { x: number, y: number, z: number }, speed: number) => commander.send(`curve ${start.x} ${start.y} ${start.z} ${end.x} ${end.y} ${end.z} ${speed}`)

export const control = {
    connect,
    takeOff,
    land,
    emergency,
    stop,
    go,
    curve,
    move: { up, down, left, right, back, front },
    rotate: { clockwise, counterClockwise },
    flip: {
        left: () => flip('l'),
        right: () => flip('r'),
        back: () => flip('b'),
        front: () => flip('f'),
    }
};

export default control;
