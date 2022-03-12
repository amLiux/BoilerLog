import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../reducers/auth.reducer';
import { uiReducer } from '../reducers/ui.reducer';
import { appointmentsReducer } from '../reducers/appointments.reducer';
import { patientsReducer } from '../reducers/patients.reducer';
import { horariosReducer } from '../reducers/horariosReducer';
import { usersReducer } from '../reducers/usersReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const combinedReducers = combineReducers({
	auth: authReducer,
	ui: uiReducer,
	citas: appointmentsReducer,
	pacientes: patientsReducer,
	horarios: horariosReducer,
	usuarios: usersReducer
});

export const store = createStore(
	combinedReducers,
	composeEnhancers(
		applyMiddleware(ReduxThunk)
	));