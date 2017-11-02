
export const getNewsCateList = data=>{
    return {
        type:'GETNEWSCATELIST',
        data
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