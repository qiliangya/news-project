
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

export const getNews = data=>{
    return {
        type:'GETNEWS',
        data
    }
}

export const getAllNewsList = data=>{
    return {
        type:'GETALLNEWSLIST',
        data
    }
}

/*  函数区 */

export function fetchGetAllNewsList(){
    return dispatch=>{
        return fetch('http://localhost:3000/news/find',{method:'POST',headers: { 'Content-Type': 'application/x-www-form-urlencoded'},cache:'reload'})
        .then(msg=>{
            return msg.json();
        })
        .then(data=>{
            return dispatch(getAllNewsList(data));
        })
    }
}


export function fetchGetNews(id=1,page=1){
    return dispatch=>{
        return fetch(`http://localhost:3000/news/list`,{method:'POST',headers: { 'Content-Type': 'application/x-www-form-urlencoded'},cache:'reload',body:`id=${id}&page=${page}`})
        .then(msg=>{
            return msg.json();
        })
        .then(data=>{
            return dispatch(getNews(data));
        })
    }
}

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