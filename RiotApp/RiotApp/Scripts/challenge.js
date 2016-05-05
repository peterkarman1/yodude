$(document).ready(function () {
    $("#summonerSearchSubmit").on("click", function (e) {
        e.preventDefault();
        getSummonerInfo($("#summonerSearchText").val());
    });
});

function getSummonerInfo(summonerName) {
    $("#summonerSearchSubmit").prop("value", "Searching...");
    $("#summonerSearchSubmit").prop("disabled", true);
    $("#searchResult").hide();
    var dataToSend = {
        summonerName: summonerName
    };
    $.ajax({
        url: $("#getSummonerInfo").data("url"),
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        success: function (data) {
            handleSuccess(data);
        }
    });
}

function handleSuccess(data) {
    $("#summonerSearchSubmit").prop("value", "Search");
    $("#summonerSearchSubmit").prop("disabled", false);
    $("#summonerName").html(data.name);
    $("#summonerLevel").html(data.summonerLevel);
    $("#searchResult").show();
    getChampionMasteries(data.id);
}

function getChampionMasteries(summonerId) {
    var dataToSend = {
        summonerId: summonerId
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

function showMasteries(masteries) {
    var masteriesHtml = [];
    for (var i = 0; i < masteries.length; i++) {
        var masteryHtml = "<p>" + masteries[i].championId + "</p>" + 
            "<p>" + masteries[i].championPoints + "</p>" + 
            "<p>" + masteries[i].championLevel + "</p>" + 
            "<p>" + masteries[i].highestGrade + "</p>" + 
            "<p>" + masteries[i].lastPlayTime + "</p>";
        masteriesHtml.push(masteryHtml);
    }
    $("#searchResult").after(masteriesHtml);
}