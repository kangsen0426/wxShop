// pages/goods_list/goods_list.js

import {
    request
} from "../../request/index.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "综合",
                isActive: true
            },
            {
                id: 1,
                value: "销量",
                isActive: false
            },
            {
                id: 2,
                value: "价格",
                isActive: false
            }
        ],
        goodsList: []
    },

    //接口参数
    QueryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },
    //总页数
    totalPage: 1,
    //是否在下拉状态
    pullDown: false,

    handleTabsItemChange(e) {
        //tab 切换
        const {
            index
        } = e.detail
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryParams.cid = options.cid

        this.getGoodsList()
    },

    //获取商品数据
    getGoodsList() {

       

        request({
            url: "/goods/search",
            data: this.QueryParams
        }).then(res => {
            console.log(res);

            if (res.data.meta.status === 200) {

                //获取总条数
                const total = res.data.message.total
                //计算总页数
                this.totalPage = Math.ceil(total / this.QueryParams.pagesize)

                this.setData({
                    //拼接数组，上拉刷新时直接调用
                    goodsList: [...this.data.goodsList, ...res.data.message.goods]
                })

                //关闭下拉窗口
                if (this.pullDown) {
                    wx.stopPullDownRefresh({
                        success: (res) => {
                            wx.showToast({
                                icon: 'none',
                                title: '刷新成功~',
                            })
                        },
                    })

                    this.pullDown = false
                }
               

            } else {
            

                wx.showToast({
                    icon: "error",
                    title: '商品搜索API失效',
                })
            }
        })

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

        this.pullDown = true

        //重置数组
        this.setData({
            goodsList: []
        })

        //重置页码
        this.QueryParams.pagenum = 1
        //重新发起请求
        this.getGoodsList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

        //判断还有没有下一页数据
        if (this.QueryParams.pagenum >= this.totalPage) {
            //没有下一页数据
            wx.showToast({
                icon: 'none',
                title: '没有更多啦~',
            })
        } else {
            //有下一页数据
            this.QueryParams.pagenum++
            this.getGoodsList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})