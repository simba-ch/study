Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 标签锚点跳转值
    indexMaodian: 'a',
    // 标签详情内容锚点跳转
    storeDetail: 'a1'
  },
  // 监听页面滑动距离
  onPageScroll(e) {
    // 通过滑动的距离判断页面滑动那个区域让后让顶部的标签栏切换到对应位置
    var height =  Number(e.detail.scrollTop)
    if (height <= 400) {
      // 滑到1区域
      this.setData({
        indexMaodian: 'a'
      });
    } else if (height > 400 && height<= 800) {
      // 滑到2区域
      this.setData({
        indexMaodian: 'b'
      });
    } else if (height > 800 && height <= 1200) {
    //  滑到3区域
      this.setData({
        indexMaodian: 'c'
      });
    } else if (height > 1200 && height <= 1600) {
      // 滑到4区域 后面难得写了，以此类推即可
      this.setData({
        indexMaodian: 'd'
      });
    }



  },
  // 跳转到对应的标签详情内容区
  toDetail(e) {
    let id = e.target.dataset.id
    this.setData({
      storeDetail: id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var systemInfo = wx.getSystemInfoSync();
    var windowHeight = systemInfo.windowHeight;
    // 拿到导航栏以下可视区域的高度
    this.setData({
      height: windowHeight
    });
  },


})
