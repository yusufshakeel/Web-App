/*!
 * dyClock is a JavaScript library for creating clock.
 *
 * Author: Yusuf Shakeel
 * https://github.com/yusufshakeel
 *
 * GitHub Link: https://github.com/yusufshakeel/dyClockJS
 *
 * MIT license
 * Copyright (c) 2016 Yusuf Shakeel
 *
 * Date: 2014-01-29 Wednesday
 */

//default: digital clock default format: (HH:mm:ss)
var clockObj = new dyClock($("#dyclock-digital"));
clockObj.start();

//default: digital clock default format: (HH:mm:ss) border
var clockObj2 = new dyClock($("#dyclock-digital-2"), {
    clock : "digital",
    format : "HH:mm:ss",
    digitalStyle : {
        border : '1px solid #999'
    }
});
clockObj2.start();

//default: digital clock default format: (HH:mm:ss) and digitalStyle
var clockObj3 = new dyClock($("#dyclock-digital-3"), {
    clock : "digital",
    format : "HH:mm:ss",
    digitalStyle : {
        border : '1px solid #999',
        backgroundColor : "lightgrey",
        fontColor : "black",
        fontSize : 48,
        fontFamily : 'Faster One'
    }
});
clockObj3.start();

//default: digital clock format: (HH:mm:ss A)
var clockObj4 = new dyClock($(".dyclock-digital-4"), {
    clock : "digital",
    format : "hh:mm:ss A"
});
clockObj4.start();

//default: digital clock format: (HH:mm a)
var clockObj5 = new dyClock($(".dyclock-digital-5"), {
    clock : "digital",
    format : "hh:mm a"
});
clockObj5.start();

//analog clock
var clockObj6 = new dyClock($("#dyclock-analog-6"), {
    clock : "analog"
});
clockObj6.start();

//analog clock - image 1
var clockObj7 = new dyClock($("#dyclock-analog-7"), {
    clock : "analog",
    image : "image/c01.png"
});
clockObj7.start();

//analog clock - image 2
var clockObj8 = new dyClock($("#dyclock-analog-8"), {
    clock : "analog",
    image : "image/c02.png",
    showdigital : true,
    format : "hh:mm:ss A",
    digitalStyle : {
        fontColor : "black",
        fontFamily : 'Faster One',
        fontSize : 28,
    }
});
clockObj8.start();

//analog clock - image 3
var clockObj9 = new dyClock($(".dyclock-analog-9"), {
    clock : "analog",

    format : "hh:mm:ss A",
    digitalStyle : {
        fontColor : "black",
        fontFamily : 'Monofett',
        fontSize : 32,
    },


    image : "image/c02.png",
    showdigital : true,
    radius : 120,
    analogStyle : {
        backgroundColor : "#eee",
        border : '1px solid #999',
        handsColor : {
            h : "red",
            m : "orange",
            s : "green"
        },
        handsWidth : {
            h : 9,
            m : 5,
            s : 2
        },
        roundHands : true,
        shape : "circle"
    }
});
clockObj9.start();
