
export const getNewsCateList = data=>{
    return {
        type:'GETNEWSCATELIST',
        data
    }
}

export const getNewsList = data=>{
    return {
        type:'GETNEWSLIST',
        data
    }
}

/*  函数区 */

export function fetchNewsList(){
    return dispatch=>{
        return fetch('http://localhost:3000/news/list',{method:'POST',cache:'reload'})
        .then(msg=>{
            return msg.json();
        })
        .then(data=>{
            return dispatch(getNewsList(data));
        })
    }
}

export function fetchNewsCateList(){
    return dispatch =>{
        return fetch('http://localhost:3000/cate/list',{method:'POST',cache:'reload'})
                .then(msg=>{
                    return msg.json();
                })
                .then(data=>{
                    dispatch(getNewsCateList(data));
                })
    }
}