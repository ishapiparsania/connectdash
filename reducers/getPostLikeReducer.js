import { ADD_LIKE,CACHE,REMOVE_POST } from "../actions/ActionType/ActionType";


const INITIAL_STATE ={  
    like:[]
}

function getPostLikeReducer(state=INITIAL_STATE,action){
    switch(action.type){
        case ADD_LIKE:{
            console.log("inside add")
            console.log(action.payload)
            return {      
               like:[ ...state.like,action.payload ]
            };
        } 

        case REMOVE_POST:{
            return {
                like:handleRemoveLike(action.payload,state.like)
            };
        }
        case CACHE:{
            return{
                like:[]
            }
        }
        default:
                return state;
    }

}

const handleRemoveLike=(item,like)=>{
    console.log(item)
    console.log(like)
    like  = like.filter((data)=>data.postid!==item.id)
    console.log(like)
    return like;

    // const postIndex = like.indexOf(item)
    // like.splice(postIndex,1)
    // console.log("after slice")
    // console.log(like)
    // return like;

}

export default getPostLikeReducer
