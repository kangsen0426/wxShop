// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],

        totalPrice: 0,
        totalNumber: 0
    },
    editAddress() {
        this.handleChooseAddress()
    },
    handleChooseAddress() {

        //获取用户的权限状态
        wx.getSetting({
            success: (result) => {
                const scopeAddress = result.authSetting["scope.address.address"]

                if (scopeAddress === true || scopeAddress === undefined) {

                    //获取收货地址
                    wx.chooseAddress({
                        success: (result2) => {
                            //将收货地址信息保存在本地
                            wx.setStorageSync('address', result2)
                        },
                    })


                } else {

                    //提示用户授权
                    wx.openSetting({
                        success: (result) => {
                            //获取收货地址
                            wx.chooseAddress({
                                success: (result2) => {
                                    //将收货地址信息保存在本地
                                    wx.setStorageSync('address', result2)
                                },
                            })
                        }
                    })

                }

            }
        })

    },



    handlePay() {




    },

    competePay() {
        //获取缓存中的购物车数据
        const cart = wx.getStorageSync('cart') || []

        //过滤后的数组
        let checkdCart = cart.filter(v => v.checked)



        //计算购物车总价格和总数量
        let totalPrice = 0;
        let totalNumber = 0;

        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.num * v.goods_price;
                totalNumber += v.num
            } else {

            }

        })

        this.setData({
            cart: checkdCart,
            totalNumber,
            totalPrice
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
        //获取缓存中的收货地址信息
        const address = wx.getStorageSync('address')

        if (address) {
            address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
        }


        this.setData({
            address
        })

        this.competePay()
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