// pages/search/search.js
import {
    request
} from "../../request/index"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        searchList: [],
        isFocus:false,
        inpValue:''
    },
    goodsInfo: {},
    tempList:[],
    timeID:-1,

    handleInput(e) {

        //防抖
        clearTimeout(this.timeID);

        const {
            value
        } = e.detail



        if (!value.trim()) {
            //不合法

            this.setData({
                isFocus:false,
                searchList:[]
            })

            return

        }

        this.setData({
            isFocus:true
        })


        
        this.timeID = setTimeout(()=>{
            //发送请求获取数据
            this.querySearch(value)
        },1000)

    },

    handleCancel(){
        this.setData({
            inpValue:'',
            searchList:[]
        })
    },

    querySearch(query) {

        this.tempList = []

        request({
            url: '/goods/qsearch',
            data: {
                query
            },
            timeout: 2000
        }).then(res => {


            if (res.data.meta.status === 200) {

                console.log(res);

                this.setData({
                    goods: res.data.message
                })


                for (let i = 0; i < this.data.goods.length; i++) {

                    this.getGoodsDetail(this.data.goods[i].goods_id)

                }

            } else {
                wx.showToast({
                    icon: "error",
                    title: '搜索API失效',
                })
            }
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

            if (res.data.meta.status === 200) {

                this.goodsInfo = res.data.message
                this.tempList.push(this.goodsInfo)
                // console.log(this.data.searchList);

                this.setData({
                    searchList: this.tempList
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