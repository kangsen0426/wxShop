// pages/goods_detail/goods_detail.js

import {
    request
} from "../../request/index"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsDetail: {},
        isCollect: false
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
            mask: true
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

                //获取缓存中的收藏商品数组
                let collect = wx.getStorageSync('collect') || []

                //判断当前商品是否被收藏
                let isCollect = collect.some(v => v.goods_id === this.goodsInfo.goods_id)

                this.setData({
                    isCollect,
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
    handleCollect() {
        let collect = wx.getStorageSync('collect') || []

        //判断是否收藏过
        let index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id)

        if (index !== -1) {
            //取消收藏
            collect.splice(index, 1)

            wx.showToast({
                icon: "success",
                title: '取消收藏成功',
            })
        } else {
            //没有收藏过
            collect.push(this.goodsInfo)
            wx.showToast({
                icon: "success",
                title: '收藏成功',
            })
        }

        this.setData({
            isCollect:!this.data.isCollect
        })

        //数据添加进缓存
        wx.setStorageSync('collect', collect)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
        //获取页面栈
        let pages = getCurrentPages()
        let currentPage = pages[pages.length - 1]
        let options = currentPage.options
        this.getGoodsDetail(options.goods_id)



    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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