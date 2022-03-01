const validHTTPMethods = {
	POST: 'POST',
	GET: 'GET',
};

const validHeaders = {
	APP_JSON: { 'Content-Type': 'application/json' },
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
};