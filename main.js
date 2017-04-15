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
                switch ( tempData.weather[ 0 ].main ) {
                    case "clear":
                        weatherIcon.setAttribute( "src", "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIzMnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyBuZXcgQXJyYW5nZWQgTmFtZXMgQ29sb3IiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjRkFGRjAwIiBpZD0iNTQgU3VuIj48cGF0aCBkPSJNMjAuOTUxOTkxNywyMC45NTUxNjU1IEMyMS4zNDUyMzg3LDIwLjU2MTkxODYgMjEuOTc4NjQ3LDIwLjU2NzYwNzMgMjIuMzcyODMwMSwyMC45NjE3OTAzIEwyMy43NzM3OTQsMjIuMzYyNzU0MyBDMjQuMTc0MDI3NiwyMi43NjI5ODc4IDI0LjE3MDk0MzEsMjMuMzkzMDY4NCAyMy43ODA0MTg4LDIzLjc4MzU5MjcgQzIzLjM4NzE3MTksMjQuMTc2ODM5NiAyMi43NTM3NjM1LDI0LjE3MTE1MDkgMjIuMzU5NTgwNSwyMy43NzY5Njc4IEwyMC45NTg2MTY1LDIyLjM3NjAwMzkgQzIwLjU1ODM4MywyMS45NzU3NzA0IDIwLjU2MTQ2NzQsMjEuMzQ1Njg5OCAyMC45NTE5OTE3LDIwLjk1NTE2NTUgWiBNMjAuOTUxOTkxNywxMS4wNTExODIxIEMyMC41NTg3NDQ3LDEwLjY1NzkzNTIgMjAuNTY0NDMzNCwxMC4wMjQ1MjY4IDIwLjk1ODYxNjUsOS42MzAzNDM3NSBMMjIuMzU5NTgwNSw4LjIyOTM3OTgxIEMyMi43NTk4MTQsNy44MjkxNDYyNiAyMy4zODk4OTQ1LDcuODMyMjMwNzEgMjMuNzgwNDE4OCw4LjIyMjc1NSBDMjQuMTczNjY1OCw4LjYxNjAwMTk2IDI0LjE2Nzk3NzEsOS4yNDk0MTAzIDIzLjc3Mzc5NCw5LjY0MzU5MzM3IEwyMi4zNzI4MzAxLDExLjA0NDU1NzMgQzIxLjk3MjU5NjUsMTEuNDQ0NzkwOSAyMS4zNDI1MTYsMTEuNDQxNzA2NCAyMC45NTE5OTE3LDExLjA1MTE4MjEgWiBNMTYsMjcuMDA2MzQ3NyBDMTUuNDQzODY0OCwyNy4wMDYzNDc3IDE1LDI2LjU1NDQzNzggMTUsMjUuOTk2OTc4OCBMMTUsMjQuMDE1NzE2NiBDMTUsMjMuNDQ5NzAwOCAxNS40NDc3MTUzLDIzLjAwNjM0NzcgMTYsMjMuMDA2MzQ3NyBDMTYuNTU2MTM1MiwyMy4wMDYzNDc3IDE3LDIzLjQ1ODI1NzUgMTcsMjQuMDE1NzE2NiBMMTcsMjUuOTk2OTc4OCBDMTcsMjYuNTYyOTk0NSAxNi41NTIyODQ3LDI3LjAwNjM0NzcgMTYsMjcuMDA2MzQ3NyBaIE0xNiw5IEMxNS40NDM4NjQ4LDkgMTUsOC41NDgwOTAxNSAxNSw3Ljk5MDYzMTEgTDE1LDYuMDA5MzY4OSBDMTUsNS40NDMzNTMxOCAxNS40NDc3MTUzLDUgMTYsNSBDMTYuNTU2MTM1Miw1IDE3LDUuNDUxOTA5ODUgMTcsNi4wMDkzNjg5IEwxNyw3Ljk5MDYzMTEgQzE3LDguNTU2NjQ2ODIgMTYuNTUyMjg0Nyw5IDE2LDkgWiBNOC4yMTk1ODExNywyMy43ODM1OTI3IEM3LjgyNjMzNDIyLDIzLjM5MDM0NTcgNy44MzIwMjI5MSwyMi43NTY5Mzc0IDguMjI2MjA1OTgsMjIuMzYyNzU0MyBMOS42MjcxNjk5MiwyMC45NjE3OTAzIEMxMC4wMjc0MDM1LDIwLjU2MTU1NjggMTAuNjU3NDg0LDIwLjU2NDY0MTIgMTEuMDQ4MDA4MywyMC45NTUxNjU1IEMxMS40NDEyNTUzLDIxLjM0ODQxMjUgMTEuNDM1NTY2NiwyMS45ODE4MjA4IDExLjA0MTM4MzUsMjIuMzc2MDAzOSBMOS42NDA0MTk1NCwyMy43NzY5Njc4IEM5LjI0MDE4NTk5LDI0LjE3NzIwMTQgOC42MTAxMDU0NiwyNC4xNzQxMTY5IDguMjE5NTgxMTcsMjMuNzgzNTkyNyBaIE0yMy4wMDMxNzM4LDE2LjAwMzE3MzggQzIzLjAwMzE3MzgsMTUuNDQ3MDM4NyAyMy40NTUwODM3LDE1LjAwMzE3MzggMjQuMDEyNTQyNywxNS4wMDMxNzM4IEwyNS45OTM4MDQ5LDE1LjAwMzE3MzggQzI2LjU1OTgyMDcsMTUuMDAzMTczOCAyNy4wMDMxNzM4LDE1LjQ1MDg4OTEgMjcuMDAzMTczOCwxNi4wMDMxNzM4IEMyNy4wMDMxNzM4LDE2LjU1OTMwOSAyNi41NTEyNjQsMTcuMDAzMTczOCAyNS45OTM4MDQ5LDE3LjAwMzE3MzggTDI0LjAxMjU0MjcsMTcuMDAzMTczOCBDMjMuNDQ2NTI3LDE3LjAwMzE3MzggMjMuMDAzMTczOCwxNi41NTU0NTg2IDIzLjAwMzE3MzgsMTYuMDAzMTczOCBaIE00Ljk5NjgyNjE3LDE2LjAwMzE3MzggQzQuOTk2ODI2MTcsMTUuNDQ3MDM4NyA1LjQ0ODczNjAyLDE1LjAwMzE3MzggNi4wMDYxOTUwNywxNS4wMDMxNzM4IEw3Ljk4NzQ1NzI4LDE1LjAwMzE3MzggQzguNTUzNDczLDE1LjAwMzE3MzggOC45OTY4MjYxNywxNS40NTA4ODkxIDguOTk2ODI2MTcsMTYuMDAzMTczOCBDOC45OTY4MjYxNywxNi41NTkzMDkgOC41NDQ5MTYzMiwxNy4wMDMxNzM4IDcuOTg3NDU3MjgsMTcuMDAzMTczOCBMNi4wMDYxOTUwNywxNy4wMDMxNzM4IEM1LjQ0MDE3OTM1LDE3LjAwMzE3MzggNC45OTY4MjYxNywxNi41NTU0NTg2IDQuOTk2ODI2MTcsMTYuMDAzMTczOCBaIE0xNiwyMiBDMTIuNjg2MjkxMywyMiAxMCwxOS4zMTM3MDg3IDEwLDE2IEMxMCwxMi42ODYyOTEzIDEyLjY4NjI5MTMsMTAgMTYsMTAgQzE5LjMxMzcwODcsMTAgMjIsMTIuNjg2MjkxMyAyMiwxNiBDMjIsMTkuMzEzNzA4NyAxOS4zMTM3MDg3LDIyIDE2LDIyIFogTTguMjE5NTgxMTcsOC4yMjI3NTUgQzguNjEyODI4MTMsNy44Mjk1MDgwNCA5LjI0NjIzNjQ3LDcuODM1MTk2NzQgOS42NDA0MTk1NCw4LjIyOTM3OTgxIEwxMS4wNDEzODM1LDkuNjMwMzQzNzUgQzExLjQ0MTYxNywxMC4wMzA1NzczIDExLjQzODUzMjYsMTAuNjYwNjU3OCAxMS4wNDgwMDgzLDExLjA1MTE4MjEgQzEwLjY1NDc2MTMsMTEuNDQ0NDI5MSAxMC4wMjEzNTMsMTEuNDM4NzQwNCA5LjYyNzE2OTkyLDExLjA0NDU1NzMgTDguMjI2MjA1OTgsOS42NDM1OTMzNyBDNy44MjU5NzI0Myw5LjI0MzM1OTgyIDcuODI5MDU2ODgsOC42MTMyNzkyOSA4LjIxOTU4MTE3LDguMjIyNzU1IFogTTguMjE5NTgxMTcsOC4yMjI3NTUiIGlkPSJPdmFsIDEzIi8+PC9nPjwvZz48L3N2Zz4=" );
                        break;
                    default:
                        weatherIcon.innerHTML = "Error";

                }
            } );
        }
    };
};

ipReq.send();
