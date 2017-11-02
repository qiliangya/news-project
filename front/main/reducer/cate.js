var initialState = {
    newsCateList:[]
}

function cate(state=initialState,action){
    const {type} = action;
    switch(type){
        case 'GETNEWSCATELIST':
        return Object.assign({},state,{ newsCateList:action.data})
        default: return state
    }
}

export default cate