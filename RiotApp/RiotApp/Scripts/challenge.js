var summonerName;
var summoner;
var champions;
var championsLoaded;

$(document).ready(function () {
    championsLoaded = false;

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
        $("#summonerSearch").show();
        $("#champions").show();
        $("#masteries").hide();
    });

    $("#challengeButton").on("click", function (e) {
        e.preventDefault();
        $("#challengeSummonerName").html("Challenge " + summoner.name + "!");
        $("#challengeConfirmButton").prop("value", "Challenge " + summoner.name + "!");
        $("#masteries").hide();
        $("#challenge").show();
    });

    $("#challengeBackButton").on("click", function (e) {
        e.preventDefault();
        $("#masteries").show();
        $("#challenge").hide();
    });

    $(".datepicker").datepicker();
});

function getSummonerInfo(name) {
    $("#summonerSearchSubmit").removeClass("btn-info");
    //$("#summonerSearchSubmit").addClass("btn-danger");
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
    //data = JSON.parse(data);
    summoner = data[summonerName];
    //$("#summonerSearchSubmit").removeClass("btn-danger");
    $("#summonerSearchSubmit").addClass("btn-info");
    $("#summonerSearchSubmit").prop("disabled", false);
    $("#summonerName").html(summoner.name);
    $("#summonerLevel").html(summoner.summonerLevel);
    $("#searchResult").show();
    if (!championsLoaded) {
        getChampions(summoner.id);
    }
}

function getChampions() {
    $.ajax({
        url: $("#getAllChamps").data("url"),
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            showChampions(data);
            championsLoaded = true;
        }
    });
}

function showChampions(data) {
    //data = JSON.parse(data);
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
        }
    }
    champions.sort(function (a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        if (textA < textB) { return -1; }
        if (textA > textB) { return 1; }
        return 0;
    });
    for (var i = 0; i < champions.length; i++) {
        var championHtml = '<div class="col-md-3" style="margin-top: 5px"><input type="submit" class="champion btn-';
        if (i % 4 == 0) {
            championHtml += 'danger" id="' + champions[i].id + '" value="' + champions[i].name + '"/></div>';
        }
        if (i % 4 == 1) {
            championHtml += 'warning" id="' + champions[i].id + '" value="' + champions[i].name + '"/></div>';
        }
        if (i % 4 == 2) {
            championHtml += 'success" id="' + champions[i].id + '" value="' + champions[i].name + '"/></div>';
        }
        if (i % 4 == 3) {
            championHtml += 'primary" id="' + champions[i].id + '" value="' + champions[i].name + '"/></div>';
        }
        championsHtml.push(championHtml);
    }
    $("#champions").show();
    $("#masteries").hide();
    $("#championsList").html(championsHtml);
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
    $("#summonerSearch").hide();
    $("#champions").hide();
    $("#masteries").show();
    if (typeof data != "undefined" && data != null) {
        //data = JSON.parse(data);
        $("#championName").html(getChampionName(championId));
        $("#championLevel").html(data.championLevel);
        $("#championPoints").html(data.championPoints);
        $("#lastPlayTime").html(new Date(data.lastPlayTime).toString());
    } else {
        $("#championName").html(getChampionName(championId));
        $("#championLevel").html("0");
        $("#championPoints").html("0");
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