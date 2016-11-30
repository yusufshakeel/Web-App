/*!
 * dyScrollUpJS is a JavaScript plugin to create a button to scroll back
 * to the top of the page.
 *
 * Author: Yusuf Shakeel
 * https://github.com/yusufshakeel
 *
 * GitHub Link: https://github.com/yusufshakeel/dyScrollUpJS
 *
 * MIT license
 * Copyright (c) 2016 Yusuf Shakeel
 *
 * Date: 2015-03-21 Saturday
 */
/*! dyScrollUpJS | (c) 2016 Yusuf Shakeel | https://github.com/yusufshakeel/dyScrollUpJS */
(function(global, $) {

    "use strict";

    var
    //this will be used by the user.
        dyscrollup = {};

    //default option
    dyscrollup.option = {
        showafter : '300',
        scrolldelay : '500',
        position : 'right',
        image : 'image/36.png',
        shape : 'circle',
        width : "auto",
        height : "auto"
    };


    /**
     * this function will extend source object with defaults object.
     *
     * @param object source     this is the source object
     * @param object defaults   this is the default object
     * @return object
     */
    function extendSource(source, defaults) {
        var property;
        for (property in defaults) {
            if (source.hasOwnProperty(property) === false) {
                source[property] = defaults[property];
            }
        }
        return source;
    }

    /**
     * this function will configure and initialize.
     *
     * option = {
     *  showafter : "integer"   //(optional) default: 300, show btn after scolling X px down
     *  scrolldelay : "intwger" //(optional) default: 500, delay the scrolling up action in milliseconds
     *  position : "string"     //(optional) values: "left|right" default: "right"
     *  image : "string"        //(optional) values: "path of the image"
     *  shape : "string"        //(optional) values: "other|circle" default: "circle"
     *  width : "integer"       //(optional) default: "auto"
     *  height : "integer"      //(optional) default: "auto"
     * }
     *
     * @param object option     user preferences
     */
    dyscrollup.init = function (option) {
        if (typeof option !== "undefined") {
            this.option = extendSource(option, this.option);
        }
        this.createBtn();
        this.onscroll();
        this.onclick();
    };

    dyscrollup.createBtn = function () {
        var
            self = this,
            html, btn, img;

        //add the button
        html = "<a id='dyscrollup-btn' href='#'><img src='"+self.option.image+"'></a>";
        $("body").prepend(html);

        //set position
        btn = $("#dyscrollup-btn");
        switch (self.option.position) {
            case 'left':
                btn.css('left', '32px');
                break;

            case 'right':
                btn.css('right', '32px');
                break;
        }

        //set shape
        img = $("#dyscrollup-btn img");
        if (self.option.shape === 'circle') {
            img.css('border-radius', '50%');
        }

        //set dimension
        img.css('width', self.option.width)
            .css('height', self.option.height);
    };

    dyscrollup.onclick = function () {
        var
            self = this;

        $("body").on("click", "a#dyscrollup-btn", function(e) {
            e.preventDefault();
            $("body").animate({
				scrollTop: 0
			}, self.option.scrolldelay);
			return false;
        });
    };

    dyscrollup.onscroll = function () {
        var
            self = this;

        $(window).on("scroll", function(e) {
			if ( $(window).scrollTop() > self.option.showafter ) {
				$('a#dyscrollup-btn').fadeIn();
			} else {
				$('a#dyscrollup-btn').fadeOut();
			}
		});
    };

    //attach to global window object
    global.dyscrollup = dyscrollup;

}(typeof window !== "undefined" ? window : this,
typeof jQuery !== "undefined" ? jQuery : undefined));
