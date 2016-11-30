

//digital clock
var clockObj_d = new dyClock( $("#digital-clock"), {
	clock : "digital",
	format : "hh:mm:ss A",
	digitalStyle : {
		fontColor : "gray",
		fontSize : "200%",
		fontFamily : "Faster One"
	}
});
clockObj_d.start();

//analog clock
var clockObj_a = new dyClock( $("#analog-clock"), {
	clock : "analog",

	image : "plugins/dyClockJS/image/c01.png",
	radius : 60,
	analogStyle : {
		handsColor : {
			h : "red",
			m : "green",
			s : "blue"
		},
		handsWidth : {
			h : 9,
			m : 5,
			s : 2
		}
	}
});
clockObj_a.start();