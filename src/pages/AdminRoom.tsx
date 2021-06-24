import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
// import { notification } from '../services/notification';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import Modal from 'react-modal';

import '../styles/room.scss';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    // const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState('');

    const { title, questions } = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        setIsDeleteModalOpen(false);
    }

    function openModal(questionId: string) {
        setIsDeleteModalOpen(true);
        setCurrentQuestion(questionId);
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={params.id} />
                        <Button IsOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta{questions.length > 0 && 's'}</span>}
                </div>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button
                                    type="button"
                                    onClick={() => openModal(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>    
                            </Question>
                        );
                    })}
                </div>
            </main>
            <Modal 
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
            >
                <div>
                    <img src={deleteImg} alt="Remover pergunta" />
                    <h1>Excluir pergunta</h1>
                    <p>Tem certeza que você deseja excluir a pergunta?</p>
                    <div>
                        <button onClick={() => setIsDeleteModalOpen(false)}>Cancelar</button>
                        <button onClick={() => handleDeleteQuestion(currentQuestion)}>Sim, excluir</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}