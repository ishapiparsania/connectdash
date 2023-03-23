import { ADD_COMMENT,CACHE,REMOVE_POST } from "../actions/ActionType/ActionType";


const INITIAL_STATE ={  
    comment:[]
}

function getPostCommentReducer(state=INITIAL_STATE,action){
    switch(action.type){

        case ADD_COMMENT:{
            console.log("inside add")
            console.log(action.payload)
            return {      
               comment:[ ...state.comment,action.payload ]
            };
        } 
         case REMOVE_POST:{
            return {
                comment:handleRemoveComment(action.payload,state.comment)
            };
        }
        case CACHE:{
            return{
                comment:[]
            }
        }
        default:
                return state;
    }

}

const handleRemoveComment=(item,comment)=>{
    // console.log("item")
    // console.log(item)
    // console.log(comment)
    comment  = comment.filter((data)=>data.postid!==item.id)
    // console.log(comment)
    return comment;

}

export default getPostCommentReducer
