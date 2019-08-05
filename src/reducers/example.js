const initialState = {
	status: 0,
	data: {}
};
const handlers = {
	CHANGE_STATUS_EXAMPLE(state, status){
		return {...state, status};
	},
	SET_DATA(state, data){
		return {...state, data};
	},
};
export default (state=initialState, {type, payload}) => handlers[type] ? handlers[type](state, payload) : state;