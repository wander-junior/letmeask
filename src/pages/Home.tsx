import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import facebookIconImg from '../assets/images/facebook.svg';

import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import { notification } from '../services/notification';

export function Home() {
    const history = useHistory();
    const { user, signInWithSocialMedia } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom(socialMedia: 'google.com' | 'facebook.com') {
        if (!user || (user && user.socialMedia !== socialMedia)) {
            await signInWithSocialMedia(socialMedia)
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            notification('Aviso!', 'Código da sala vazio!', 'warning');
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            notification('Erro!', 'Sala inexistente!', 'danger');
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <button onClick={() => handleCreateRoom('google.com')} className="create-room">
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <button onClick={() => handleCreateRoom('facebook.com')} className="create-room facebook">
                        <img src={facebookIconImg} alt="Logo do facebook" />
                        Crie sua sala com o Facebook
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}