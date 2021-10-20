// pages/goods_detail/goods_detail.js

import {
    request
} from "../../request/index"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsDetail: {}
    },

    goodsInfo: {},

    handleCartAdd() {
        //点击加入购物车 数组
        let cart = wx.getStorageSync('cart') || []

        //判断商品对象是否存在与购物车数组中
        let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id)

        if (index === -1) {
            //不存在，第一次添加
            this.goodsInfo.num = 1
            this.goodsInfo.checked = true
            cart.push(this.goodsInfo)
        } else {
            // 已经存在，执行数量变化
            cart[index].num++
        }
        //把购物车数据添加到缓存中
        wx.setStorageSync('cart', cart);

        //弹窗提示
        wx.showToast({
          title: '添加成功',
          mask:true
        })
    },

    handlePrevewImage(e) {
        //预览轮播图图片

        const urls = this.goodsInfo.pics.map(v => {
            return v.pics_mid
        })

        const current = e.currentTarget.dataset.url


        wx.previewImage({
            urls,
            current
        })
    },

    getGoodsDetail(goods_id) {
        request({
            url: '/goods/detail',
            data: {
                goods_id
            },
            timeout: 2000
        }).then(res => {
            console.log(res.data);

            if (res.data.meta.status === 200) {

                this.goodsInfo = res.data.message

                this.setData({
                    goodsDetail: {
                        goods_name: res.data.message.goods_name,
                        goods_price: res.data.message.goods_price,
                        goods_introduce: res.data.message.goods_introduce,
                        pics: res.data.message.pics
                    }
                })
            } else {
                wx.showToast({
                    icon: "error",
                    title: '商品详情API失效',
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.getGoodsDetail(options.goods_id)
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