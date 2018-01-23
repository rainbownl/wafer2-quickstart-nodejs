// pages/myPage/myPage.js
const config = require("../../config.js")
var qcloud = require("../../vendor/wafer2-client-sdk/index.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        retData: '',
        imageSrc: '',
        imageUrls: undefined,
        animationData: {},
        questions: {},
        correctMsg: undefined,
        radioSelectFlag:false
    },

    onTestClick: function () {
        var that = this
        var header = {
            name: 'Jack',
            age: 17,
        }

        wx.login({
            success: result => {
                console.log(result)
            }
        })
        wx.request({
            url: config.service.helloUrl,
            header: header,
            success: function (result) {
                that.setData({
                    retData: result.data ? result.data.data : 'server return nothing'
                })
                console.log(result.data)
            },
            fail: function (error) {
                that.setData({
                    retData: error.msg
                })
                console.log(error)
            }
        })
    },
    onUploadClick: function () {
        var that = this
        var userInfo

        //test animation
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0,
            transformOrigin: "50% 50% 0",
        })
        animation.top(0).step()
        this.setData({
            animationData: animation.export()
        })
        return
        wx.chooseImage({
            success: function (res) {
                wx.showLoading({
                    title: 'Uploading',
                })

                wx.uploadFile({
                    url: config.service.uploadUrl,
                    filePath: res.tempFilePaths[0],
                    name: 'file',
                    /*header: {
                      userID: userInfo.ID
                    },*/
                    success: function (result) {
                        that.setData({
                            imageSrc: that.parseUploadUrlFromJson(result.data)
                        })
                        wx.hideLoading()
                    },
                    fail: function () {
                        console.log('upload fail')
                        wx.hideLoading()
                    },
                })
            },
        })
    },
    parseUploadUrlFromJson: function (jsonStr) {
        var json = JSON.parse(jsonStr)
        var code = json.code
        return json.data.imgUrl
    },

    getImageUrls: function () {
        wx.request({
            url: config.service.getImageUrls,
            method: 'GET',
            success: result => {
                console.log(result)
            }
        })
    },

    radioChange: function (res) {
        if (res.detail.value == this.data.questions.correctAnswer) {
            this.setData({
                correctMsg: "正确",
                //radioSelectFlag: true,
            })
        }
        else {
            this.setData({
                correctMsg: "失败",
                //radioSelectFlag: true,
            })
        }
        wx.request({
            url:config.service.getquestionUrl,
            success: (result) => {
                console.log("result", result)
                if (result.data.code == 0){
                    setTimeout(() => {
                        this.setData({
                            questions:{
                                question: result.data.data[0].question,
                                answers: [
                                    { text: result.data.data[0].answer1, value: "A"},
                                    { text: result.data.data[0].answer2, value: "B"},
                                    { text: result.data.data[0].answer3, value: "C"},
                                    { text: result.data.data[0].answer4, value: "D"}],
                                correctAnswer: result.data.data[0].correct,
                            },
                            correctMsg: undefined,
                            radioSelectFlag: false,
                        })
                    }, 1000)
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var getImageUrls = function () {
            wx.request({
                url: config.service.getImageUrls,
                method: 'GET',
                success: result => {
                    that.setData({
                        imageUrls: result.data.data
                    })
                }
            })
        }

        this.setData({
            questions:{
                question: "1 + 1 = ?",
                answers: [
                    { text: "1", value: "A" },
                    { text: "2", value: "B" },
                    { text: "3", value: "C" },
                    { text: "4", value: "D" }],
                correctAnswer: "B",
            }
        })
        getImageUrls()
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