import { useState } from 'react';
import { StyledContainer, StyledForm } from './form.styles';

const Form = () => {
	const [users, setUsers] = useState();
	const [newUser, setNewUser] = useState({
		name: '',
		email: ''
	});
	const [userId, setUserId] = useState();

	return (
		<StyledContainer>
			<StyledForm onSubmit={e => postUsers(e, setUsers, newUser)}>
				<input
					onInput={e => setNewUser({ ...newUser, name: e.target.value })}
					type='text'
					placeholder='Name'
				/>
				<input
					onInput={e => setNewUser({ ...newUser, email: e.target.value })}
					type='text'
					placeholder='Email'
				/>
				<input type='submit' value='Post New User' />
			</StyledForm>
			<StyledForm onSubmit={e => patchUsers(e, setUsers, newUser, userId)}>
				<input
					onInput={e => setUserId(e.target.value)}
					type='text'
					placeholder='User ID'
				/>
				<input
					onInput={e => setNewUser({ ...newUser, name: e.target.value })}
					type='text'
					placeholder='New Name'
				/>
				<input
					onInput={e => setNewUser({ ...newUser, email: e.target.value })}
					type='text'
					placeholder='New Email'
				/>
				<input type='submit' value='Edit User' />
			</StyledForm>
			<StyledForm onSubmit={e => deleteUsers(e, setUsers, newUser, userId)}>
				<input
					onInput={e => setUserId(e.target.value)}
					type='text'
					placeholder='User ID'
				/>
				<input type='submit' value='Delete User' />
			</StyledForm>

			<button onClick={() => fetchUsers(setUsers)}>Get Users</button>
			{users?.map(user => (
				<div key={user.userId}>
					<p>{user.userId}</p>
					<p>{user.name}</p>
					<p>{user.email}</p>
				</div>
			))}
		</StyledContainer>
	);
};

const fetchUsers = async setUsers => {
	try {
		const response = await fetch('http://localhost:8000/api/users');
		const json = await response.json();
		setUsers(json);
	} catch (err) {
		console.error(err);
	}
};

const postUsers = async (event, setUsers, newUser) => {
	event.preventDefault();
	try {
		const response = await fetch('http://localhost:8000/api/users', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json'
			}
		});
		const json = await response.json();
		console.log(json);
		setUsers(json);
	} catch (err) {
		console.error(err);
	}
};

const patchUsers = async (event, setUsers, newUser, userId) => {
	event.preventDefault();
	console.log(userId);
	try {
		const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
			method: 'PATCH',
			body: JSON.stringify(newUser),
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json'
			}
		});
		const json = await response.json();
		console.log(json);
		setUsers(json);
	} catch (err) {
		console.error(err);
	}
};

const deleteUsers = async (event, setUsers, newUser, userId) => {
	event.preventDefault();
	console.log(userId);
	try {
		const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
			method: 'DELETE',
			body: JSON.stringify(newUser),
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json'
			}
		});
		const json = await response.json();
		console.log(json);
		setUsers(json);
	} catch (err) {
		console.error(err);
	}
};

export default Form;
