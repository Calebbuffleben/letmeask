import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { database } from '../services/firebase';

export function NewRoom(){
	const { user } = useAuth();
	const [newRoom, setNewRoom] = useState('');
	const history = useHistory();

	async function handleCreateRoom(event: FormEvent){
		event.preventDefault();

		if(newRoom.trim() === ''){
			return;
		}

		const roomRef = database.ref('rooms');	

		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		});

		console.log(user?.id);
		history.push(`/rooms/${firebaseRoom.key}`);	
	}

	return (
		<div id="page-auth">
			<aside>
				<img src={illustrationImg} alt="Imagem" />
				<strong>Crie salas de Q&amp;A ao vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo real</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logoImg} alt="Imagem" />
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreateRoom}>
						<input
							type="text"
							placeholder="Nome da sala"
							onChange={(event) => {setNewRoom(event.target.value)}}
							value={newRoom}
						/>
						<Button>
							Criar sala
						</Button>
					</form>
					<p>
						Quer entrar em uma sala existente? <Link to='/'>clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	);
}