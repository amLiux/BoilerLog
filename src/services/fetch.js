// const url = `https://boiler-log-be.herokuapp.com/`
const url = `http://localhost:3000`

export const fetchRegister = (email, pwd, name, lastName, user) => 
	fetch(`${url}/new`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, pwd, name, lastName, user })
	})
   
export const fetchLogin = (user, pwd) => 
	fetch(`${url}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ user, pwd })
	})

export const fetchValidateJWT = (token) => 
	fetch(`${url}/renew`, {
		method: 'GET',
		headers: {'Authorization': token},
	})

export const fetchGetCitas = (token) => 
	fetch(`${url}/citas`, {
		method: 'GET',
		headers: {'Authorization': token},
	})

export const fetchPutCitas = (token, cita) => 
	fetch(`${url}/citas`, {
		method: 'PUT',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(cita)
	})