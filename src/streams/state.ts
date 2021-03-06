import dgram from "dgram";
import { State } from "./state.interfaces";
import { EventEmitter } from "events";
import { constants } from "../constants";

const client = dgram.createSocket('udp4'),
    _local = {
        emitter: new EventEmitter()
    };

const format = (mapped: any): State => ({
    pitch: mapped.pitch,
    roll: mapped.roll,
    yaw: mapped.yaw,
    speed: { x: mapped.vgx, y: mapped.vgy, z: mapped.vgz },
    temperature: { low: mapped.templ, high: mapped.temph },
    tof: mapped.tof,
    height: mapped.h,
    battery: mapped.bat,
    barometer: mapped.baro,
    time: mapped.time,
    acceleration: { x: mapped.agx, y: mapped.agy, z: mapped.agz }
})

const map = (message: any): State => {
    let mapped = message.toString()
        .slice(0, -1)
        .split(';')
        .map((element: string) => element.split(':'))
        // @ts-ignore
        .reduce((acc, [key, value]) => {
            acc[key] = Number(value)
            return acc
        }, {})

    return format(mapped)
}

client.on('message', message => _local.emitter.emit('message', map(message)))

const bind = () => {
    client.bind(constants.ports.state)
    return _local.emitter
}

const close = () => client.close()

export const state = { bind, close };
export default state;
