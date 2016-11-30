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

/*! dyClockJS | (c) 2016 Yusuf Shakeel | https://github.com/yusufshakeel/dyClockJS */

(function (global, $) {

    "use strict";

    var
        /**
         * this will create the dyClock object based on the configuration
         * option passed by the user.
         *
         * option = {
         *  clock : "string"    //(optional) values: "analog|digital|both" default: digital
         *  format : "string"   //(optional) values: "(hh|HH):mm(:ss) (a|A)" default: "HH:mm:ss"
         *  hand : "string"     //(optional) values: "hm(s)" applicable: analog clock
         *  image : "string"    //(optional) value: /path/to/image file applicable: analog clock
         *  radius : integer    //(optional) values: integer min: 40px max: 150px applicable: analog clock
         *  showdigital : boolean   //(optional) values: true|false default: false applicable: analog clock
         * }
         *
         * @param object target
         * @param object options
         */
        dyClock = function (target, options) {

            //checking target
            if (typeof target === "undefined") {
                global.console.error("target undefined");
                return;
            }

            //checking radius - applicable for analog clock
            if (typeof options !== "undefined" && typeof options.radius !== "undefined") {

                options.radius = global.Math.ceil(options.radius);

                if (options.radius < 30) {
                    options.radius = 30;
                } else if (options.radius > this.defaults.radius) {
                    options.radius = this.defaults.radius;
                }
            }

            /**
             * container of the clock
             */
            this.target = target;
            this.targetPrefix = this.target.selector.substring(1);

            /**
             * user configuration extends defaults configuration
             */
            this.clockOption = (typeof options !== "undefined") ? this.extendSource(options, this.defaults) : this.defaults;

            /**
             * to start stop clock
             */
            this.tick = null;

            /**
             * to set the clock options format like time string, time ocject
             */
            this.setClockOptionFormat();

        };

        /**
         * defaults
         */
        dyClock.prototype.defaults = {
            clock : "digital",

            //for digital clock
            format : "HH:mm:ss",
            digitalStyle : {
                backgroundColor : "#fff",
                border : "none",
                fontColor : "#000",
                fontFamily : "Arial",
                fontSize : 16
            },

            //for analog clock
            hand : "hms",
            radius : 150,
            showdigital : false,
            image : false,
            analogStyle : {
                backgroundColor : "#fff",
                border : "none",
                handsColor : {
                    h : "#000",
                    m : "#000",
                    s : "#000"
                },
                handsWidth : {
                    h : 3,
                    m : 2,
                    s : 1
                },
                roundHands : false,
                shape : "circle"
            }
        };

        /**
         * this function will extend source object with defaults object.
         *
         * @param object source     this is the source object
         * @param object defaults   this is the default object
         * @return object
         */
        dyClock.prototype.extendSource = function (source, defaults) {
            var property;
            for (property in defaults) {
                if (source.hasOwnProperty(property) === false) {
                    source[property] = defaults[property];
                }
            }
            return source;
        };

        /**
         * set clock options format
         */
        dyClock.prototype.setClockOptionFormat = function () {

            var
                obj = {},
                format = [],
                time,
                ampm;

            //split format
            format = this.clockOption.format.split(" ");

            //get time format from format
            time = format[0].split(":");

            //get am/pm format from format
            ampm = (typeof format[1] !== "undefined") ? format[1] : false;

            //set format time
            if (time[0] === "hh") {
                obj.hour = "12";
            } else if (time[0] === "HH") {
                obj.hour = "24";
            }

            obj.showMinutes = true;

            if (typeof time[2] !== "undefined" && time[2] === "ss") {
                obj.showSeconds = true;
            } else {
                obj.showSeconds = false;
            }

            this.clockOption.format_time = obj;

            //set format ampm
            if (ampm === false) {
                this.clockOption.format_showam = false;
            } else {
                //if lowercase am/pm then 0, else 1
                this.clockOption.format_showam = true;
                this.clockOption.format_showamvalue = (ampm === "a") ? ["am", "pm"] : ["AM", "PM"];
            }
        };

        /**
         * get current time
         */
        dyClock.prototype.getTime = function () {

            var
                dateObj = new global.Date(),
                time = {};

            //set current time
            time.hour = dateObj.getHours();
            time.minute = dateObj.getMinutes();
            time.second = dateObj.getSeconds();

            return time;
        };

        /**
         * this function will return time string based on user option.
         *
         * @param object timeData
         * @param object clockOption
         * @return string
         */
        dyClock.prototype.getTimeString = function (timeData, clockOption) {

            var
                tmp,
                timeString = "";

            switch (clockOption.format_time.hour) {
            case "12":
                //set hour
                if (timeData.hour === 0) {
                    timeString = "12 ";
                } else if (timeData.hour > 12) {
                    tmp = (timeData.hour - 12);
                    timeString = (tmp < 10) ? "0" + tmp : tmp;
                } else {
                    timeString = (timeData.hour < 10) ? "0" + timeData.hour : timeData.hour;
                }

                break;

            case "24":
                //set hour
                timeString = (timeData.hour < 10) ? "0" + timeData.hour : timeData.hour;
                break;

            default:
                global.console.error("Invalid format: hour");
            }

            //set minute
            if (timeData.minute < 10) {
                timeString = timeString + " : 0" + timeData.minute;
            } else {
                timeString = timeString + " : " + timeData.minute;
            }

            //set second
            if (clockOption.format_time.showSeconds === true) {
                if (timeData.second < 10) {
                    timeString = timeString + " : 0" + timeData.second;
                } else {
                    timeString = timeString + " : " + timeData.second;
                }
            }

            //show am/pm
            if (clockOption.format_showam === true) {
                if (timeData.hour >= 12) {
                    timeString = timeString + " " + clockOption.format_showamvalue[1];
                } else {
                    timeString = timeString + " " + clockOption.format_showamvalue[0];
                }
            }

            return timeString;

        };

        /**
         * this function will start the clock
         */
        dyClock.prototype.start = function () {

            var self = this;

            if (this.clockOption.clock === "digital") {

                this.drawDigitalClock();
                this.tick = global.setInterval( function() { self.runDigitalClock(); }, 1000);

            } else if (this.clockOption.clock === "analog") {

                this.drawAnalogClock();
                this.tick = global.setInterval( function() { self.runAnalogClock(); }, 1000);

            }

        };

        /**
         * this function will stop the clock
         */
         dyClock.prototype.stop = function () {

             global.clearInterval(this.tick);

         };

        /**
         * this function will draw the digital clock
         */
        dyClock.prototype.drawDigitalClock = function () {

            var
                html;

            //create the digital clock container
            html = "<div class='" + this.targetPrefix + "-digital-time-string dyclock-digital-time'></div>";
            this.target.html(html);

            this.styleDigitalClock();

        };

        /**
         * style the digital clock time string
         */
        dyClock.prototype.styleDigitalClock = function () {
            var
                self = this,
                digitalStyle = self.clockOption.digitalStyle,
                elem;

            elem = $("." + self.targetPrefix + "-digital-time-string");

            /**
             * backgroundColor style
             */
            if (typeof digitalStyle.backgroundColor !== "undefined") {
                elem.css('background-color', digitalStyle.backgroundColor);
            } else {
                elem.css('background-color', self.defaults.digitalStyle.backgroundColor);
            }

            /**
             * border style
             */
            if (typeof digitalStyle.border !== "undefined") {
                elem.css('border', digitalStyle.border);
            } else {
                elem.css('border', self.defaults.digitalStyle.border);
            }

            /**
             * fontColor style
             */
            if (typeof digitalStyle.fontColor !== "undefined") {
                elem.css('color', digitalStyle.fontColor);
            } else {
                elem.css('color', self.defaults.digitalStyle.fontColor);
            }

            /**
             * fontFamily style
             */
            if (typeof digitalStyle.fontFamily !== "undefined") {
                elem.css('font-family', digitalStyle.fontFamily);
            } else {
                elem.css('font-family', self.defaults.digitalStyle.fontFamily);
            }

            /**
             * fontSize style
             */
            if (typeof digitalStyle.fontSize !== "undefined") {
                elem.css('font-size', digitalStyle.fontSize);
            } else {
                elem.css('font-size', self.defaults.digitalStyle.fontSize);
            }

        };

        /**
         * this function will run the digital clock
         */
        dyClock.prototype.runDigitalClock = function () {

            var
                targetClass = this.targetPrefix + "-digital-time-string";

            $("."+targetClass).html(this.getTimeString(this.getTime(), this.clockOption));

        };

        /**
         * this function will draw the analog clock
         */
        dyClock.prototype.drawAnalogClock = function () {

            var
                width = this.clockOption.radius * 2,
                height = width,
                cx = this.clockOption.radius,
                cy = cx,
                hlen = global.Math.ceil(this.clockOption.radius * 0.65),
                mlen = global.Math.ceil(this.clockOption.radius * 0.3),
                slen = global.Math.ceil(this.clockOption.radius * 0.1),
                stlen = global.Math.ceil(this.clockOption.radius * 0.9),
                clockStyle = "",
                timeHTML = "",
                html;

            /**
             * show digital clock time string
             */
            if (this.clockOption.showdigital === true) {
                timeHTML = "<div class='" + this.targetPrefix + "-digital-time-string dyclock-digital-time' style='text-align: center; margin-top: 15px;'></div>";
            } else {
                timeHTML = "<div class='" + this.targetPrefix + "-digital-time-string dyclock-digital-time' style='display: none; text-align: center; margin-top: 15px;'></div>";
            }

            /**
             * if analog clock face image is provided then use that
             */
            if (typeof this.clockOption.image !== "undefined" && this.clockOption.image !== false) {
                clockStyle = "style = 'background: url(" + this.clockOption.image + "); background-repeat: no-repeat; background-size: contain;'";
            }

            /**
             * create the analog clock html
             */
            html = "<div class='dyclock-analog-time " + this.targetPrefix + "-analog-clock'" + clockStyle + ">" +
                "<svg width='" + width + "' height='" + height + "'>" +
                    "<line class='" + this.targetPrefix + "-analog-hand " + this.targetPrefix + "-h-hand dyclock-h-hand' x1='" + cx + "' y1='" + cy + "' x2='" + cx + "' y2='" + hlen + "'/>" +
                    "<line class='" + this.targetPrefix + "-analog-hand " + this.targetPrefix + "-m-hand dyclock-m-hand' x1='" + cx + "' y1='" + cy + "' x2='" + cx + "' y2='" + mlen + "'/>" +
                    "<line class='" + this.targetPrefix + "-analog-hand " + this.targetPrefix + "-s-hand dyclock-s-hand' x1='" + cx + "' y1='" + cy + "' x2='" + cx + "' y2='" + slen + "'/>" +
                    "<line class='" + this.targetPrefix + "-analog-hand " + this.targetPrefix + "-s-tail dyclock-s-tail' x1='" + cx + "' y1='" + cy + "' x2='" + cx + "' y2='" + stlen + "'/>" +
                "</svg>" +
            "</div>" +
            timeHTML;

            this.target.html(html);
            this.styleDigitalClock();
            this.styleAnalogClock();

        };

        /**
         *
         */
        dyClock.prototype.styleAnalogClock = function () {

            var
                self = this,
                elem = $("." + self.targetPrefix + "-analog-clock"),
                analogStyle = self.clockOption.analogStyle;

            /**
             * backgroundColor style
             */
            if (typeof analogStyle.backgroundColor !== "undefined") {
                elem.css('background-color', analogStyle.backgroundColor);
            } else {
                elem.css('background-color', self.defaults.analogStyle.backgroundColor);
            }

            /**
             * border style
             */
            if (typeof analogStyle.border !== "undefined") {
                elem.css('border', analogStyle.border);
            } else {
                elem.css('border', self.defaults.analogStyle.border);
            }

            /**
             * handsColor style
             */
            if (typeof analogStyle.handsColor !== "undefined") {

                //hour hand
                if (typeof analogStyle.handsColor.h !== "undefined") {
                    $("." + this.targetPrefix + "-h-hand").css('stroke', analogStyle.handsColor.h);
                } else {
                    $("." + this.targetPrefix + "-h-hand").css('stroke', self.defaults.analogStyle.handsColor.h);
                }

                //minute hand
                if (typeof analogStyle.handsColor.m !== "undefined") {
                    $("." + this.targetPrefix + "-m-hand").css('stroke', analogStyle.handsColor.m);
                } else {
                    $("." + this.targetPrefix + "-m-hand").css('stroke', self.defaults.analogStyle.handsColor.m);
                }

                //second hand
                if (typeof analogStyle.handsColor.s !== "undefined") {
                    $("." + this.targetPrefix + "-s-hand").css('stroke', analogStyle.handsColor.s);
                    $("." + this.targetPrefix + "-s-tail").css('stroke', analogStyle.handsColor.s);
                } else {
                    $("." + this.targetPrefix + "-s-hand").css('stroke', self.defaults.analogStyle.handsColor.s);
                    $("." + this.targetPrefix + "-s-tail").css('stroke', self.defaults.analogStyle.handsColor.s);
                }

            } else {

                //hour hand
                $("." + this.targetPrefix + "-h-hand").css('stroke', self.defaults.analogStyle.handsColor.h);

                //minute hand
                $("." + this.targetPrefix + "-m-hand").css('stroke', self.defaults.analogStyle.handsColor.m);

                //second hand
                $("." + this.targetPrefix + "-s-hand").css('stroke', self.defaults.analogStyle.handsColor.s);
                $("." + this.targetPrefix + "-s-tail").css('stroke', self.defaults.analogStyle.handsColor.s);

            }

            /**
             * handsWidth style
             */
            if (typeof analogStyle.handsWidth !== "undefined") {

                //hour hand
                if (typeof analogStyle.handsWidth.h !== "undefined") {
                    $("." + this.targetPrefix + "-h-hand").css('stroke-width', analogStyle.handsWidth.h);
                } else {
                    $("." + this.targetPrefix + "-h-hand").css('stroke-width', self.defaults.analogStyle.handsWidth.h);
                }

                //minute hand
                if (typeof analogStyle.handsWidth.m !== "undefined") {
                    $("." + this.targetPrefix + "-m-hand").css('stroke-width', analogStyle.handsWidth.m);
                } else {
                    $("." + this.targetPrefix + "-m-hand").css('stroke-width', self.defaults.analogStyle.handsWidth.m);
                }

                //second hand
                if (typeof analogStyle.handsWidth.s !== "undefined") {
                    $("." + this.targetPrefix + "-s-hand").css('stroke-width', analogStyle.handsWidth.s);
                    $("." + this.targetPrefix + "-s-tail").css('stroke-width', analogStyle.handsWidth.s);
                } else {
                    $("." + this.targetPrefix + "-s-hand").css('stroke-width', self.defaults.analogStyle.handsWidth.s);
                    $("." + this.targetPrefix + "-s-tail").css('stroke-width', self.defaults.analogStyle.handsWidth.s);
                }

            } else {

                //hour hand
                $("." + this.targetPrefix + "-h-hand").css('stroke-width', self.defaults.analogStyle.handsWidth.h);

                //minute hand
                $("." + this.targetPrefix + "-m-hand").css('stroke-width', self.defaults.analogStyle.handsWidth.m);

                //second hand
                $("." + this.targetPrefix + "-s-hand").css('stroke-width', self.defaults.analogStyle.handsWidth.s);
                $("." + this.targetPrefix + "-s-tail").css('stroke-width', self.defaults.analogStyle.handsWidth.s);

            }

            /**
             * roundHands style
             */
            if (typeof analogStyle.roundHands !== "undefined" && analogStyle.roundHands === true) {
                $("." + this.targetPrefix + "-analog-hand").css('stroke-linecap', 'round');
            }

            /**
             * shape style
             */
            if (typeof analogStyle.shape !== "undefined" && analogStyle.shape === "circle") {
                elem.css('border-radius', '50%');
            }


        };

        /**
         * this function will run the analog clock
         */
        dyClock.prototype.runAnalogClock = function () {

            var
                d = this.getTime(),
                h = 30 * ((d.hour % 12) + d.minute / 60),
                m = 6 * d.minute,
                s = 6 * d.second;

            //clock-hands
            $("." + this.targetPrefix + "-h-hand").attr('transform', this.getRotateStr(h));
            $("." + this.targetPrefix + "-m-hand").attr('transform', this.getRotateStr(m));
            $("." + this.targetPrefix + "-s-hand").attr('transform', this.getRotateStr(s));
            $("." + this.targetPrefix + "-s-tail").attr('transform', this.getRotateStr(s+180));

            //time-string
            $("." + this.targetPrefix + "-digital-time-string").html(this.getTimeString(this.getTime(), this.clockOption));
        };

        /**
         * this function will return the rotate string for transfrom
         */
        dyClock.prototype.getRotateStr = function (val) {

            var
                width = this.clockOption.radius * 2,
                height = width,
                cx = this.clockOption.radius,
                cy = cx;

            return "rotate(" + val + ", " + cx + ", " + cy + ")";
        };

    /**
     * attach to global
     */
     global.dyClock = dyClock;

}(typeof window !== "undefined" ? window : this,
typeof jQuery !== "undefined" ? jQuery : undefined));
