// pages/order/order.js

import {
    request
} from "../../request/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "全部",
                isActive: true
            },
            {
                id: 1,
                value: "待付款",
                isActive: false
            },
            {
                id: 2,
                value: "待发货",
                isActive: false
            },
            {
                id: 3,
                value: "退款/退货",
                isActive: false
            }
        ],
    },
    changeTitleByIndex(index) {
        let {
            tabs
        } = this.data

        tabs.forEach((v, i) => {
            i === index ? v.isActive = true : v.isActive = false
        })

        this.setData({
            tabs
        })
    },
    handleTabsItemChange(e) {
        //tab 切换
        const {
            index
        } = e.detail
        this.changeTitleByIndex(index)
    },

    getOrders(type) {

        request({
            url: "/my/orders/all",
            data: {
                type
            }
        }).then(res => {
            console.log(res)
            wx.showToast({
                icon: "error",
                title: 'token失效~',
            })
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        //验证有无token
        const token = wx.getStorageSync('token')

        if (!token) {




            // wx.switchTab({
            //     url: '/pages/user/user',
            // })



            // return
        }



        //获取页面栈
        let pages = getCurrentPages()
        let currentPage = pages[pages.length - 1]


        console.log(currentPage.options.type - 1);
        this.getOrders(currentPage.options.type)
        this.changeTitleByIndex(currentPage.options.type - 1)
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