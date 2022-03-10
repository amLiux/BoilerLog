// Prod
// const url = `https://drsmaroto.com`;

//staging
// const url = `https://boiler-log-be.herokuapp.com`;

//dev
// TODO we want to pull this from process.env.URL
const url = `http://192.168.100.95:3000`;

const processPayload = (payload) => JSON.stringify(payload);

const processResponse = async (url, requestInfo) => {
	let resp;
	try {
		console.log(`Iniciando petición: ${url}`);
		resp = await fetch(url, requestInfo);
		return resp;
	} catch (err) {
		console.error(
			`Error executando la petición ${url}. 
			 Más detalles del error: ${err}.		`
		);
	}
};

export const processRequest = async (template, payload = {}, urlChangers = {}) => {
	const { path, headers = {}, method } = template;

	let fetchUrl = `${url}${path}`;

	let requestInfo = {
		method,
		headers
	};

	if (template.requiresAuthentication) {
		const token = localStorage.getItem('token')
		headers['Authorization'] = token;
	}

	if (template.requiresDynamicPath && urlChangers.hasOwnProperty('dynamicPath')) {
		fetchUrl = `${fetchUrl}/${urlChangers.dynamicPath}`;
	}

	if (template.includesQueryParam && urlChangers.hasOwnProperty('queryParams')) {
		urlChangers.queryParams.forEach((queryParam, index) => {
			if (index === 0) return fetchUrl = `${fetchUrl}/${encodeURIComponent(queryParam)}`;
			fetchUrl = `${fetchUrl}&${encodeURIComponent(queryParam)}`;
		});
	}

	const emptyPayload = Object.keys(payload).length === 0;
	const validFileUploadRequest = payload instanceof FormData && template.fileUpload;

	if (!emptyPayload) {
		requestInfo.body = processPayload(payload);
	}

	//FormData constructor cannot go through Object.keys so we skip the empty payload validation and add the body here
	if (validFileUploadRequest) {
		requestInfo.body = payload;
	}


	return processResponse(fetchUrl, requestInfo);
};

export const fetchGetCitas = (token) =>
	fetch(`${url}/citas`, {
		method: 'GET',
		headers: { 'Authorization': token },
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

export const fetchPostCitas = (token, paciente, horario) =>
	fetch(`${url}/citas`, {
		method: 'POST',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ paciente, horario })
	})


export const fetchDeleteCitas = (token, id) =>
	fetch(`${url}/citas/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': token,
		}
	})

export const fetchGetHorarios = (_id) =>
	fetch(`${url}/citas/${_id}`, { method: 'GET' })

export const fetchGetHorariosByDate = (date, token) =>
	fetch(`${url}/citas/date/${encodeURIComponent(date)}`,
		{
			method: 'GET',
			headers: {
				'Authorization': token,
				'Content-Type': 'application/json'
			}

		}
	)

export const fetchPutHorarioCita = (_id, horario) =>
	fetch(`${url}/citas/${_id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ horario })
	}
	)

export const fetchPostReporte = (reporte, detallesFecha, token) =>
	fetch(`${url}/reportes/${reporte}`, {
		method: 'POST',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(detallesFecha)
	})

export const fetchPutUser = (token, id, update) =>
	fetch(`${url}/users/${id}`, {
		method: 'POST',
		headers: { 'Authorization': token, 'Content-Type': 'application/json' },
		body: JSON.stringify(update)
	})