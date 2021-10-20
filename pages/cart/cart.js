// pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false,
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
    handleItemChange(e) {
        //商品复选框事件

        //获取商品 id
        const goods_id = e.currentTarget.dataset.id
        //获取购物车数组
        let {
            cart
        } = this.data

        //找到被修改的商品数据
        let index = cart.findIndex(v => v.goods_id === goods_id)
        //修改选中状态
        cart[index].checked = !cart[index].checked
        //把新数据添加到缓存和data中

        wx.setStorageSync('cart', cart)

        //重新计算价格和数量
        this.competePay()

    },
    handleItemAllChange() {
        //全选框
        //获取data中的数据
        let {
            cart,
            allChecked
        } = this.data
        //修改值
        allChecked = !allChecked
        //遍历修改每一个商品的值
        cart.forEach(v => v.checked = allChecked)
        //填充回缓存中
        wx.setStorageSync('cart', cart)
        //重新计算
        this.competePay()
    },
    handleItemNumEdit(e) {
        let {
            operation,
            id
        } = e.currentTarget.dataset

        //获取购物车数组
        let {
            cart
        } = this.data

        //找到被修改的商品数据
        let index = cart.findIndex(v => v.goods_id === id)


        if (operation === '+') {

            //修改选中状态
            cart[index].num++
            //把新数据添加到缓存和data中

            wx.setStorageSync('cart', cart)

            //重新计算价格和数量
            this.competePay()

        } else {
            if (cart[index].num === 1) {
                //提示是否删除
                wx.showModal({
                    title: "提示",
                    content: "是否删除该商品",
                    success: (res) => {
                        if (res.confirm) {
                            cart.splice(index, 1)
                            wx.setStorageSync('cart', cart)

                            //重新计算价格和数量
                            this.competePay()
                        } else if (res.cancel) {
                            return;
                        }
                    }
                })
            } else {
                //修改选中状态
                cart[index].num--
                //把新数据添加到缓存和data中

                wx.setStorageSync('cart', cart)

                //重新计算价格和数量
                this.competePay()
            }
        }

    },
    handlePay(){

        const {totalNumber,address} = this.data

        //验证购物车是否有商品

        if(!totalNumber){
            wx.showToast({
                icon:'none',
              title: '先去选购商品吧~',
            })

            return
        }

        //验证是否添加了收货地址
        if(!address.userName){
            wx.showToast({
                icon:"none",
              title: '请先添加收货地址~'
            })

            return
        }
        //跳转结算
        wx.navigateTo({
          url: '/pages/pay/pay',
        })


    },

    competePay() {
        //获取缓存中的购物车数据
        const cart = wx.getStorageSync('cart') || []

        //计算是否为全选
        /*
         every 方法 遍历数组 需要每一个回调都返回 true 最后才能返回true
         有一个回调为 false 立即终止，最终返回 false
 
         空数组返回 true
         */
        let allChecked = true
        // const allChecked = cart.every(cart.length ? v => v.checked : false)

        //计算购物车总价格和总数量
        let totalPrice = 0;
        let totalNumber = 0;

        cart.forEach(v => {
            if (v.checked) {
                totalPrice += v.num * v.goods_price;
                totalNumber += v.num
            } else {
                allChecked = false
            }

        })

        //判断数组是否为空
        if (!cart.length) {
            allChecked = false
        }





        this.setData({
            cart,
            allChecked,
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