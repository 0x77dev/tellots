import constants from "./constants";
import dgram from "dgram";

const client = dgram.createSocket('udp4'),
    _local = {
        state: "idle"
    }

client.on('message', (msg) => {
    _local.state = msg.toString()
});

client.bind(constants.ports.response)

const bindStateManagement = (resolve: Function, reject: Function) => {
    let timeoutId = setTimeout(() => {
        _local.state = "error"
    }, 10000);
    let intervalId = setInterval(() => {
        if (isIdle())
            return
        if (isError())
            reject(_local.state)
        else
            resolve(_local.state)
        clearInterval(intervalId)
        clearTimeout(timeoutId)
        _local.state = "idle"
    }, 100);
}

const isIdle = () => _local.state === "idle"
const isError = () => _local.state === "error"

const transmit = (command: string) => {
    const message = Buffer.from(command)
    client.send(message, 0, message.length, constants.ports.command, constants.hosts.remote, (error) => {
        if (error)
            _local.state = "error"
    })
}

const send = (command: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!isIdle())
            reject("error")
        bindStateManagement(resolve, reject)
        transmit(command)
    })
}

export const exchanger = { send, _local };
export default exchanger;
