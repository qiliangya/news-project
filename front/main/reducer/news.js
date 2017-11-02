var initialState = {
    newsList:[],
    news:[]
}

function news(state=initialState,action){
    const {type} = action;
    switch(type){
        case 'GETNEWSLIST':
        return Object.assign({},state,{ newsList:action.data});
        case 'GETNEWS':
        return Object.assign({},state,{news:action.data});
        default: return state
    }
}

export default news