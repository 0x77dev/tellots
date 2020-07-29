import controlCommands from './commands/control';
import readCommands from './commands/read';
import setCommands from './commands/set';
import stateStream from './streams/state';
import videoStream from './streams/video';


export const Tello = {
    control: controlCommands,
    read: readCommands,
    set: setCommands,
    receiver: {
        state: stateStream,
        video: videoStream
    }
};

export default Tello;
