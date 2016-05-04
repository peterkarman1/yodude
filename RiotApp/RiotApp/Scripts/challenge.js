var summonerName;
var summoner;
var champions;

$(document).ready(function () {
    $("#summonerSearchSubmit").on("click", function (e) {
        e.preventDefault();
        getSummonerInfo($("#summonerSearchText").val());
    });

    $("body").on("click", ".champion", function (e) {
        e.preventDefault();
        getMasteryInfo($(this).prop("id"));
    });

    $("#backToChampionsList").on("click", function (e) {
        e.preventDefault();
        $("#champions").show();
        $("#masteries").hide();
    });
});

function getSummonerInfo(name) {
    $("#summonerSearchSubmit").prop("value", "Searching...");
    $("#summonerSearchSubmit").prop("disabled", true);
    $("#searchResult").hide();
    summonerName = name;
    var dataToSend = {
        summonerName: name
    };
    $.ajax({
        url: $("#getSummonerInfo").data("url"),
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        success: function (data) {
            showSummonerInfo(data);
        }
    });
}

function showSummonerInfo(data) {
    data = JSON.parse(data);
    summoner = data[summonerName];
    $("#summonerSearchSubmit").prop("value", "Search");
    $("#summonerSearchSubmit").prop("disabled", false);
    $("#summonerName").html(summoner.name);
    $("#summonerLevel").html(summoner.summonerLevel);
    $("#searchResult").show();
    getChampions(summoner.id);
}

function getChampions() {
    $.ajax({
        url: $("#getAllChamps").data("url"),
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            showChampions(data);
        }
    });
}

function showChampions(data) {
    data = JSON.parse(data);
    champions = [];
    var championsHtml = [];
    for (var prop in data.data) {
        if (data.data.hasOwnProperty(prop)) {
            var champion = {
                id: data.data[prop].id,
                key: data.data[prop].key,
                name: data.data[prop].name
            }
            champions.push(champion);
            var masteryHtml = "<div class='col-md-3' style='margin-top: 5px'><input type='submit' class='champion btn-primary' id='" + champion.id + "' value='" + champion.name + "'/></div>";
            championsHtml.push(masteryHtml);
        }
    }
    $("#champions").show();
    $("#masteries").hide();
    $("#champions").html(championsHtml);
}

function getMasteryInfo(championId) {
    var dataToSend = {
        summonerId: summoner.id,
        championId: championId
    };
    $.ajax({
        url: $("#getMasteryInfo").data("url"),
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        success: function (data) {
            showMasteries(data, championId);
        }
    });
}

function showMasteries(data, championId) {
    $("#champions").hide();
    $("#masteries").show();
    if (data.length) {
        data = JSON.parse(data);
        $("#championName").html(getChampionName(championId));
        $("#championLevel").html(data.championLevel);
        $("#championPoints").html(data.championPoints);
        $("#championPointsSinceLastLevel").html(data.championPointsSinceLastLevel);
        $("#championPointsUntilNextLevel").html(data.championPointsUntilNextLevel);
        $("#lastPlayTime").html(new Date(data.lastPlayTime).toString());
    } else {
        $("#championName").html(getChampionName(championId));
        $("#championLevel").html("0");
        $("#championPoints").html("0");
        $("#championPointsSinceLastLevel").html("0");
        $("#championPointsUntilNextLevel").html("???");
        $("#lastPlayTime").html("Not played");
    }
}

function getChampionName(championId) {
    for (var i = 0; i < champions.length; i++) {
        if (champions[i].id == championId) {
            return champions[i].name;
        }
    }
    return "";
}