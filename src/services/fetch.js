export const fetchRegister = (email, pwd, name, lastName, user) => 
	fetch(`http://localhost:3000/new`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, pwd, name, lastName, user })
	})
   
export const fetchLogin = (user, pwd) => 
	fetch(`http://localhost:3000/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ user, pwd })
	})

export const fetchValidateJWT = (token) => 
	fetch(`http://localhost:3000/renew`, {
		method: 'GET',
		headers: {'Authorization': token},
	})

export const fetchGetCitas = (token) => 
	fetch(`http://localhost:3000/`, {
		method: 'GET',
		headers: {'Authorization': token},
	})