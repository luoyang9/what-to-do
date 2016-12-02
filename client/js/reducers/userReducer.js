
const initialState = {
	name: ""
}

const userReducer = (state=initialState, action) => {
	switch(action.type) {
		case "CHANGE_NAME": {
			return {...state, name: action.payload.name};
		}
	}
	return state;
}

export default userReducer;