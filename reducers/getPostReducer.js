import { POST,REMOVE_POST,EDIT_POST,CACHE} from "../actions/ActionType/ActionType";
import moment from 'moment';

const INITIAL_STATE ={
    post:[],
}
function getPostReducer(state=INITIAL_STATE,action){
    switch(action.type){
        case POST:{
            return {  
                post:[ ...state.post,action.payload ] 
            };
        }
        case REMOVE_POST:{
            return {
                post:handleRemovePost(action.payload,state.post)
            };
        }

        case EDIT_POST:
            return {     
                post : editTodoHandler(action.payload,state.post)
            }

        case CACHE:{
            return{
                post:[]
            }
        }

        default:
                return state;
        }

}

const handleRemovePost=(item,post)=>{
    // console.log(item)
    // console.log(post)
    const postIndex = post.indexOf(item)
    post.splice(postIndex,1)
    // console.log("after slice")
    console.log(post)
    return post;

}


 const editTodoHandler=(item,post)=>{
        console.log(item)
        console.log(post)
        const removefirst = post.findIndex(post => 
            (post.id === item.id))
            
            post.splice(removefirst , 1);
            
        const newItem = {

            id:item.id,
            post:item.post,
            image:item.image,
            name:item.name,
            date:moment(new Date()).format("MM/DD/YYYY hh:mm:ss A"),     
            profimage:item.profimage
        }
        post.push(newItem);
        return post
        
    }


export default getPostReducer