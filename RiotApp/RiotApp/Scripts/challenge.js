var summonerName;
var summoner;
var champions;
var championsLoaded;

$(document).ready(function () {
    championsLoaded = false;

    $(".datepicker").datepicker({
        minDate: new Date()
    });

    $("#summonerSearchSubmit").on("click", function (e) {
        e.preventDefault();
        $("#searchAndChallenge").hide();
        $("#viewAllChallenges").hide();
        getSummonerInfo($("#summonerSearchText").val());
    });

    $("body").on("click", ".champion", function (e) {
        e.preventDefault();
        $("#champions").hide();
        $("#challengeButton").show();
        $("#backToChampionsList1").show();
        getMasteryInfo($(this).prop("id"));
    });

    $("#backToChampionsList1").on("click", function (e) {
        e.preventDefault();
        $("#summonerSearch").show();
        $("#champions").show();
        $("#masteries").hide();
        $("#challenge").hide();
    });

    $("#backToChampionsList2").on("click", function (e) {
        e.preventDefault();
        $("#summonerSearch").show();
        $("#champions").show();
        $("#masteries").hide();
        $("#challenge").hide();
    });

    $("#challengeButton").on("click", function (e) {
        e.preventDefault();
        showChallengeForm();
    });

    $("#challengeConfirmButton").on("click", function () {
        var endDate = $("#challengeEndDate").val();
        var points = $("#challengePoints").val();
        submitChallenge(summoner.id, endDate, points);
    });

    $("#viewChallenges").on("click", function (e) {
        e.preventDefault();
        getChallanges(1);
    });
});

//GET

function getSummonerInfo(name) {
    $("#summonerSearchSubmit").prop("disabled", true);
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
        },
        complete: function () {
            $("#summonerSearchSubmit").prop("disabled", false);
        }
    });
}

function getAllMasteryInfo(summonerId) {
    var dataToSend = {
        summonerId: summonerId,
    };
    $.ajax({
        url: $("#getAllMasteryInfo").data("url"),
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        success: function (data) {
            showAllMasteryInfo(data);
        }
    });
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
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus + "\n*****\n" + errorThrown);
        }
    });
}

function getChampionName(championId) {
    for (var i = 0; i < champions.length; i++) {
        if (champions[i].id == championId) {
            return champions[i].name;
        }
    }
    return "";
}

function getChallanges(userId) {
    var dataToSend = {
        userId: userId
    };
    $.ajax({
        url: $("#getChallenges").data("url"),
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        success: function (data) {
            showChallenges(data);
        },
        error: function (textStatus, errorThrown) {
            alert(textStatus + "\n*****\n" + errorThrown);
        }
    });
}

//SHOW

function showSummonerInfo(data) {
    //data = JSON.parse(data);
    console.log(data);
    if (typeof data[summonerName] != "undefined" && data[summonerName] != null) {
        summoner = data[summonerName];
        getAllMasteryInfo(summoner.id);
        $("#summonerName").html(summoner.name);
        $("#summonerLevel").html(summoner.summonerLevel);
        if (!championsLoaded) {
            getChampions(summoner.id);
        } else {
            $("#champions").show();
        }
    } else {
        $("#summonerName").html("Not found");
        $("#summonerLevel").html("");
        $("#bestChampion").html("");
        $("#totalMasteryPoints").html("");
        $("#searchAndChallenge").show();
        $("#searchResult").show();
        $("#champions").hide();
    }
    $("#masteries").hide();
}

function showAllMasteryInfo(data) {
    var totalPoints = 0;
    var bestChampionId = -1;
    var bestChampionPoints = 0;
    for (var i = 0; i < data.length; i++) {
        totalPoints += data[i].championPoints;
        if (data[i].championPoints > bestChampionPoints) {
            bestChampionId = data[i].championId;
            bestChampionPoints = data[i].championPoints;
        }
    }
    var bestChampionName = getChampionName(bestChampionId);
    $("#bestChampion").html(bestChampionName);
    $("#totalMasteryPoints").html(totalPoints);
    $("#searchResult").show();
    $("#searchAndChallenge").show();
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
        var imageName = champions[i].name.replace("'", "").replace(".", "").replace("-", "").replace(" ", "");
        var championHtml =
            "<div class='col-md-2 col-sm-3 col-xs-6' style='margin-top: 5px; cursor: pointer'>" +
                "<img src='/Content/Images/" + imageName + "_Square_0.png' class='champion' id='" + champions[i].id + "'/>" +
            "</div>";
        championsHtml.push(championHtml);
    }
    $("#championsList").html(championsHtml);
    $("#champions").show();
}

function showMasteries(data, championId) {
    if (typeof data != "undefined" && data != null && typeof data.championId != "undefined") {
        //data = JSON.parse(data);
        $("#championName").html(getChampionName(championId));
        $("#championLevel").html(data.championLevel);
        $("#championPoints").html(data.championPoints);
        $("#lastPlayTime").html($.datepicker.formatDate("mm/dd/yy", new Date(data.lastPlayTime)));
    } else {
        $("#championName").html(getChampionName(championId));
        $("#championLevel").html("0");
        $("#championPoints").html("0");
        $("#lastPlayTime").html("Not played");
    }
    $("#masteries").show();
}

function showChallengeForm() {
    var championName = $("#championName").html();
    $("#challengeSummonerName").html("Challenge " + summoner.name + " on " + championName + "!");
    $("#challengeConfirmButton").prop("value", "Challenge " + summoner.name + "!");
    $("#challengeButton").hide();
    $("#backToChampionsList1").hide();
    $("#challenge").show();
}

function showChallenges(challenges) {
    $("#viewAllChallenges").show();
    $("#searchAndChallenge").hide();
    var challengesHtml = "";
    for (var i = 0; i < challenges.challenges.length; i++) {
        challengesHtml +=
            "<div class='row'>" +
                "<div class='col-md-3 col-sm-3 col-xs-12'><p>" +
                    challenges.challenges[i].SummonerId +
                "</p></div>" +
                "<div class='col-md-3 col-sm-3 col-xs-12'><p>" +
                    challenges.challenges[i].Points +
                "</p></div>" +
                "<div class='col-md-3 col-sm-3 col-xs-12'><p>" +
                    $.datepicker.formatDate("mm/dd/yy", new Date(parseInt(challenges.challenges[i].EndDate.substr(6)))) +
                "</p></div>" +
                "<div class='col-md-3 col-sm-3 col-xs-12'><input class='btn-primary form-control' value='View Progress' type='submit' id='" +
                    challenges.challenges[i].ChallengeId +
                "'/></div>" +
            "</div>";
    }
    $("#challengesList").html(challengesHtml);
}

//SUBMIT

function submitChallenge(summonerId, endDate, points) {
    alert("TODO");
    //var dataToSend = {
    //    SummonerId: summonerId,
    //    EndDate: endDate,
    //    Points: points
    //};
    //$.ajax({
    //    url: $("#submitChallenge").data("url"),
    //    type: "GET",
    //    dataType: "json",
    //    contentType: "application/json; charset=utf-8",
    //    data: dataToSend,
    //    success: function () {
    //        alert();
    //    }
    //});
}