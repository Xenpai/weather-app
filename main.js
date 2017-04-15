//jshint esversion: 6

//Get the IP identifier JSON

let ipReq = new XMLHttpRequest(),
    tempReq = new XMLHttpRequest(),
    unit = "&units=metric",
    site = "http://api.openweathermap.org/data/2.5/weather?q=",
    appKey = "&APPID=409e02052e1bc5247f0654ec01a0a2c7";
ipReq.open( "GET", "https://ipinfo.io/json" );

// Actually working on that thing now.

ipReq.onload = function() {
    let locData = JSON.parse( this.responseText ).city;
    console.log( ipReq.readyState );
    tempReq.open( "GET", site + locData + unit + appKey, true );
    tempReq.send();
    tempReq.onreadystatechange = function() {
        if ( tempReq.readyState === XMLHttpRequest.DONE && tempReq.status === 200 ) {
            let tempData = JSON.parse( tempReq.responseText ),
                cc = document.querySelector( ".city-country" ),
                unit = document.querySelector( ".unit" ),
                temp = document.querySelector( ".temp" ),
                weatherIcon = document.querySelector( ".weather-icon" ),
                weather = document.querySelector( ".weather" );
            cc.innerHTML = tempData.name + ", " + tempData.sys.country;
            temp.innerHTML = Math.round( tempData.main.temp );
            weather.innerHTML = tempData.weather[ 0 ].main;
            unit.addEventListener( "click", () => {
                if ( unit.innerHTML == "C" ) {
                    unit.innerHTML = "F";
                    temp.innerHTML = Math.round( ( temp.innerHTML * 1.8 ) + 32 );
                } else {
                    unit.innerHTML = "C";
                    temp.innerHTML = Math.round( ( temp.innerHTML - 32 ) / 1.8 );
                }

            } );
            switch ( tempData.weather[ 0 ].main ) {
                case "Clear":
                    weatherIcon.setAttribute( "src", "http://i.imgur.com/IcLB9WK.png" );
                    break;
                case "Drizzle":
                    weatherIcon.setAttribute( "src", "http://i.imgur.com/PaBDxXC.png" );
                    break;
                case "Clouds":
                    weatherIcon.setAttribute( "src", "http://i.imgur.com/1bRxNd8.png" );
                    break;
                case "Rain":
                    weatherIcon.setAttribute( "src", "http://i.imgur.com/8gPwt7V.png" );
                    break;
                case "Snow":
                    weatherIcon.setAttribute( "src", "http://i.imgur.com/bNSdRbN.png" );
                    break;
                case "Thunderstorm":
                    weatherIcon.setAttribute( "src", "http://i.imgur.com/XGeVLMq.png" );
                    break;
                default:
                    weatherIcon.setAttribute( "src", "http://i.imgur.com/IcLB9WK.png" );
                    break;

            }
        }
    };
};

ipReq.send();
