var initialState = {
    newsList:[],
    news:[],
    allNewsList:[]
}

function news(state=initialState,action){
    const {type} = action;
    switch(type){
        case 'GETNEWSLIST':
        return Object.assign({},state,{ newsList:action.data});
        case 'GETNEWS':
        return Object.assign({},state,{news:action.data});
        case 'GETALLNEWSLIST':
        return Object.assign({},state,{allNewsList:action.data});
        default: return state
    }
}

export default news