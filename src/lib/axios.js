import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000'

class HttpRequest {
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}  //保存请求,控制不重复添加loading
        this.url = ''
        this.service = axios.create()
        this.setInterceptors(this.service)
      
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new HttpRequest()
     
        }
        return this.instance
    }
    getInitConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {

            }
        }
        return config
    }
    destroy() {
        delete this.queue[this.url]
        if (!Object.keys(this.queue).length) {
            console.log("关闭全局loading")
        }
    
    }
    setInterceptors(service) {
        service.interceptors.request.use(config => {

            if (!Object.keys(this.queue).length) {
                //添加全局loading
                console.log("添加全局loading")
            }

            this.queue[this.url] = true

            // const token = getToken()
            // config.headers.common['Authorization'] = 'Bearer ' + token;
            return config
        }, err => {
            return Promise.reject(err)
        })
        service.interceptors.response.use(res => {
            this.destroy() 
            const {data} = res        
            return data
        }, err => {
            this.destroy()
            return Promise.reject(err)
        })
    }
    request(options) {
        this.url = options.url
        options = Object.assign(this.getInitConfig(), options)
        return this.service(options)
    }

}
export default HttpRequest