import { EventEmitter } from "events";
import { constants } from "../constants";
import dgram from "dgram";
import commander from "../exchanger";

const client = dgram.createSocket('udp4'),
    _local = {
        emitter: new EventEmitter()
    }

client.on('message', message => _local.emitter.emit('message', message))

const bind = async () => {
    try {
        await commander.send('streamon')
    } catch (_) {
        throw "Unable to start video stream"
    }
    client.bind(constants.ports.video)
    _local.emitter = new EventEmitter()
    return _local.emitter
}

const close = async () => {
    try {
        await commander.send('streamoff')
    } catch (error) {
        throw "Unable to stop video stream"
    }
    client.close()
}

export const video = { bind, close };
export default video;
