import {
    request
} from "../../request/index.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {

        //左侧菜单数据
        leftMenuList: [],
        //右侧分类数据
        rightContent: [],
        // 当前点击的菜单
        currentIndex: 0,
        scrollTop:0
    },
    //商品数据
    categoryList: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        /*
        1.先判断有没有本地存储的旧数据
        2.没有旧数据，直接发送新请求
        3.有旧数据 同时没有过期，直接使用本地存储的数据
        */


        const Cates = wx.getStorageSync('cates');

        if (!Cates) {
            this.getCateGoryList()
        } else {
            if (Date.now() - Cates.time > 1000 * 60 * 5) {
                this.getCateGoryList()
            } else {

               
                this.categoryList = Cates.data

                //构造左侧的大菜单数据
                let leftMenuList = this.categoryList.map(v => v.cat_name)
                //构造右侧的商品数据
                let rightContent = this.categoryList[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }

    },

    //左侧菜单点击事件
    handleItemTap(e) {
        //获取更新索引
        const {
            index
        } = e.currentTarget.dataset

        //变化右侧数据
        let rightContent = this.categoryList[index].children


        this.setData({
            currentIndex: index,
            rightContent,
            scrollTop:0
        })
    },

    getCateGoryList() {

        request({
            url: '/categories',
            timeout: 2000
        }).then(res => {
            console.log(res.data);

            if (res.data.meta.status === 200) {

                this.categoryList = res.data.message

                // 本地存储
                wx.setStorageSync('cates', {
                    time: Date.now(),
                    data: this.categoryList
                })

                //构造左侧的大菜单数据
                let leftMenuList = this.categoryList.map(v => v.cat_name)
                //构造右侧的商品数据
                let rightContent = this.categoryList[0].children

                this.setData({
                    leftMenuList,
                    rightContent
                })
            } else {
                wx.showToast({
                    icon:"error",
                    title: '商品分类API失效',
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