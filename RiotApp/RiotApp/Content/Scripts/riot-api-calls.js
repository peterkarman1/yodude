function getMasteryInfo(summonerId, championId) {
    var dataToSend = {
        summonerId: summonerId,
        championId: championId
    };
    $.ajax({
        url: '../api/Riot/GetMasteryInfo',
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
    $.ajax({
        url: '../api/Riot/GetSummonerInfo',
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
        url: '../api/Riot/GetAllChamps',
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
        url: '../api/Riot/GetSpecificChamp',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dataToSend),
        success: function (data) {
            return data;
        }
    });
}