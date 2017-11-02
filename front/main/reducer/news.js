var initialState = {
    newsList:[]
}

function news(state=initialState,action){
    const {type} = action;
    switch(type){
        case 'GETNEWSLIST':
        return Object.assign({},state,{ newsList:action.data})
        default: return state
    }
}

export default news