import {
  request
} from "../../request/index.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList: [],
    // 导航栏数据
    catesList:[],
    // 楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取轮播图数据

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获取轮播图数据
    this.getSwiperList()
    this.getCatesList()
    this.getFloorList()
  },

  getSwiperList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      timeout: 2000
    }).then(res => {
      console.log(res.data);

      if (res.data.meta.status === 200) {
        this.setData({
          swiperList: res.data.message
        })
      } else {
        wx.showToast({
          title: '轮播图API失效',
        })
      }
    })
  },
  getCatesList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      timeout: 2000
    }).then(res => {
      console.log(res.data);

      if (res.data.meta.status === 200) {
        this.setData({
          catesList: res.data.message
        })
      } else {
        wx.showToast({
          title: '导航栏API失效',
        })
      }
    })
  },
  getFloorList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      timeout: 2000
    }).then(res => {
      console.log(res.data);

      if (res.data.meta.status === 200) {
        this.setData({
          floorList: res.data.message
        })
      } else {
        wx.showToast({
          title: '导航栏API失效',
        })
      }
    })
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