import axios from './index'


export const test = () => {
    return axios.request({
       
        url:'/getUserInfo',
        method: 'get',
   
    })
}

export const getUser = ({username,password}) => {
    return axios.request({
       
        url:'/users/getUser',
        method: 'post',
        data:{
            username,
            password
        }
    })
}
// export const login = ({username, password}) => {
//     return axios.request({
    
//         url:'/users/login',
//         method: 'post',
//         data:{
//             username,
//             password
//         }
//     })
// }
// export const register = ({username, password}) => {
//     return axios.request({
    
//         url:'/users/register',
//         method: 'post',
//         data:{
//             username,
//             password
//         }
//     })
// }

// export const authorization = (username)=>{
//     return axios.request({
//         url: '/users/authorization',
//         method: 'post',
//         data:{
//             username
//         }
//     })
// }