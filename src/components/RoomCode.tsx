import copyImg from '../assets/images/copy.svg';
import { notification } from '../services/notification';

import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code);
        notification('Sucesso!', 'Código da sala copiado com sucesso', 'success');
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span> Sala #{props.code}</span>
        </button>
    )
}