function getMasteryInfo(summonerId, championId) {
    var dataToSend = {
        summonerId: summonerId,
        championId: championId
    };
    $.ajax({
        url: $("#getMasteryInfo").data("url"),
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dataToSend),
        success: function (data) {
            return data;
        }
    });
}

function getSummonerInfo(summonerName) {
    var dataToSend = {
        summonerName: summonerName,
    };
    console.log(dataToSend);
    alert($("#getSummonerInfo").data("url"));
    $.ajax({
        url: $("#getSummonerInfo").data("url"),
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dataToSend),
        success: function (data) {
            return data;
        }
    });
}

function getAllChamps() {
    $.ajax({
        url: $("#getAllChamps").data("url"),
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            return data;
        }
    });
}

function getSpecificChamp(championId) {
    var dataToSend = {
        championId: championId
    };
    $.ajax({
        url: $("#getSpecificChamp").data("url"),
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dataToSend),
        success: function (data) {
            return data;
        }
    });
}