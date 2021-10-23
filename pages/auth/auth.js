// pages/auth/auth.js

import request from "../../request/index"

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    handlegetUserInfo(e) {
        //获取用户信息
        const {
            encryptedData,
            rawData,
            iv,
            signature
        } = e.detail

        //获取小程序登入成功后的 code
        wx.login({
            timeout: 10000,
            success: (res) => {
                const {
                    code
                } = result

                const loginParams = {
                    encryptedData,
                    rawData,
                    iv,
                    signature,
                    code
                }

                //发送请求获取token
                request({
                    url: "/users/wxlogin",
                    data: loginParams,
                    method: "post"
                }).then(res => {
                    const {
                        token
                    } = res

                    //本地存储
                    wx.setStorageSync('token', token)
                })

            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})