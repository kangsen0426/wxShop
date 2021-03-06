//将微信请求的api封装为 promise 形式

//同时发送异步请求的代码次数
let ajaxTimes = 0;

export const request = (params) => {

    //判断 url 中是否带有 my
    let header = {...params.header}
    if(params.url.includes("/my/")){
        header["Authorization"] = wx.getStorageSync('token')
    }
    ajaxTimes++;
    wx.showLoading({
        mask: true
    })

    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'

    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header,
            url: baseUrl + params.url,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                //完成了一个就减一个
                ajaxTimes--

                if (!ajaxTimes) {
                    //全部请求都完成了
                    wx.hideLoading()

                }
            }
        })
    })
}