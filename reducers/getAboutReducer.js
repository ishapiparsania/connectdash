import { ADD_ABOUT} from "../actions/ActionType/ActionType";

const INITIAL_STATE ={
    about:" ",
}
function getAboutReducer(state=INITIAL_STATE,action){
    switch(action.type){
        case ABOUT:{
            return {  
                // about:[ ...state.post,action.payload ]  
                about: state.about
            };
        }
       
        default:
                return state;
        }

}

export default getAboutReducer