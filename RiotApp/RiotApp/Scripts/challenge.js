var summonerName;
var summoner;
var champions;

$(document).ready(function () {
    $("#summonerSearchSubmit").on("click", function (e) {
        e.preventDefault();
        getSummonerInfo($("#summonerSearchText").val());
    });

    $("body").on("click", ".champion", function () {
        getMasteryInfo($(this).prop("id"));
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
            var masteryHtml = "<p id='" + champion.id + "' class='champion'>" + champion.name + "</p>";
            championsHtml.push(masteryHtml);
        }
    }
    $("#searchResult").after(championsHtml);
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
            showMasteries(data);
        }
    });
}

function showMasteries(data) {
    alert(data);
    data = JSON.parse(data);
    alert(data);
}