//将微信请求的api封装为 promise 形式
export const request = (params) => {
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}