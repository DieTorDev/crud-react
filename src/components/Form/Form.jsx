import { useState } from 'react';
import { StyledContainer } from './form.styles';

const Form = () => {
	const [users, setUsers] = useState();

	console.log(users);

	return (
		<StyledContainer>
			<button onClick={() => fetchUsers(setUsers)}>Pedir Usuarios</button>
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
		const response = await fetch('http://localhost:8000');
		const json = await response.json();
		setUsers(json);
	} catch (err) {
		console.error(err);
	}
};

export default Form;
