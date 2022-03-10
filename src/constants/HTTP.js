const validHTTPMethods = {
	POST: 'POST',
	GET: 'GET',
	DELETE: 'DELETE',
	PUT: 'PUT',
};

const validHeaders = {
	APP_JSON: { 'Content-Type': 'application/json' },
	CONTENT_ATTACHMENT: { 'Content-Disposition': 'attachment' }
};

export const requestTemplates = {
	LOGIN: {
		path: '/login',
		method: validHTTPMethods.POST,
		headers: validHeaders.APP_JSON,
	},
	REGISTER: {
		path: '/new',
		method: validHTTPMethods.POST,
		headers: validHeaders.APP_JSON,
	},
	VALIDATE_JWT: {
		path: '/renew',
		mehthod: validHTTPMethods.GET,
		requiresAuthentication: true,
	},
	GET_USERS: {
		path: '/users',
		method: validHTTPMethods.GET,
		requiresAuthentication: true,
	},
	UPLOAD_FILE: {
		path: '/files',
		method: validHTTPMethods.POST,
		requiresAuthentication: true,
		requiresDynamicPath: true,
		fileUpload: true
	},
	GET_FILES: {
		path: '/files',
		method: validHTTPMethods.GET,
		requiresAuthentication: true,
		requiresDynamicPath: true
	},
	DELETE_FILE: {
		path: '/files',
		method: validHTTPMethods.DELETE,
		requiresAuthentication: true,
		includesQueryParam: true
	},
	DOWNLOAD_FILE: {
		path: '/files',
		method: validHTTPMethods.GET,
		requiresAuthentication: true,
		includesQueryParam: true,
		headers: validHeaders.CONTENT_ATTACHMENT
	},
	UPDATE_PATIENT: {
		path: '/pacientes',
		method: validHTTPMethods.PUT,
		requiresAuthentication: true,
		headers: validHeaders.APP_JSON,
	},
	GET_PATIENTS: {
		path: '/pacientes',
		method: validHTTPMethods.GET,
		requiresAuthentication: true,
	},
	GET_PATIENT_APPOINTMENTS: {
		path: '/citas/paciente',
		method: validHTTPMethods.GET,
		requiresAuthentication: true,
		requiresDynamicPath: true,
	},
	CREATE_USER: {
		path: '/pacientes',
		method: validHTTPMethods.POST,
		requiresAuthentication: true,
		headers: validHTTPMethods.APP_JSON,
	},
	SEARCH_PATIENT: {
		path: '/pacientes/search',
		method: validHTTPMethods.GET,
		requiresAuthentication: true,
		requiresDynamicPath: true,
	}
};