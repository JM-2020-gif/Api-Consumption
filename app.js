const urlApiWeatherData =  'https://www.el-tiempo.net/api/json/v2/home';
const urlApiWeatherProvince = "https://www.el-tiempo.net/api/json/v2/provincias/";

getWeather(urlApiWeatherData, false)
function getWeather(url, flag) {
    let data = ''
    try {
        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            data = jsonData;
            if (flag) {
                prnt(data, flag)  
            } else {
                prnt(data, flag)                
            }

        }) 
    } catch (error) {
      console.log('error in the peticion ', error);  
    }
}

function prnt(params, flag) {
    var myObj, x, txt = "";
    myObj = params;
    if (flag) {
        txt += "<div class='boxes'>"
        txt += "<div class='imgboxes'>" + 
            myObj.title + "</div>" + 
            "<div class='infboxes'>" +  myObj.today.p +
            "</div>"+  "<div class='infboxes'> "+ myObj.tomorrow.p +
            " </div><div class='button' ><input  onclick='getWeather("+'"'+urlApiWeatherData + '"'+")' type='button'> Go Back </input> </div></div>";
        document.getElementById("demo").innerHTML = txt;
    } else {        
        for (x in myObj['ciudades']) {
            txt += "<div class='boxes'>"
            txt += "<div class='imgboxes'>" + 
                myObj['ciudades'][x].name + "</div>" + 
                "<div class='infboxes'> Expected Temperature max" +  myObj['ciudades'][x]['temperatures'].max + 
                "<br> Expected Temperature min" + myObj['ciudades'][x]['temperatures'].min +
                "</div>"+  "<div class='button'> <input onclick='getInfoProvince("+'"'+myObj['ciudades'][x].idProvince + '"'+ ")' type='button'> More Info </input> </div></div>";
        }
        document.getElementById("demo").innerHTML = txt;
    }    
}

async function getInfoProvince(idProv='') {
    await getWeather(urlApiWeatherProvince+idProv, true)    
}

