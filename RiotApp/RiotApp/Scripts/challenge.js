var summonerName;
var summoner;
var champions;
var championsLoaded;
var loginSummonerId;

$(document).ready(function () {
    championsLoaded = false;
    loginSummonerId = $("#loginSummonerId").data("id");

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

    //$("body").on("click", ".challenge", function (e) {
    //    e.preventDefault();
    //    getChallengeProgress($(this).prop("id"));
    //});
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

//function getChallengeProgress(challengeId) {
//    var dataToSend = {
//        challengeId: 1
//    };
//    $.ajax({
//        url: $("#getChallengeProgress").data("url"),
//        type: "GET",
//        dataType: "json",
//        contentType: "application/json; charset=utf-8",
//        data: dataToSend,
//        success: function (data) {
//            showChallengeProgress(data, challengeId);
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            alert(textStatus + "\n*****\n" + errorThrown);
//        }
//    });
//}

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
        var opponentName;
        var isChallenger;
        if (challenges.challenges[i].ChallengerId == loginSummonerId) {
            opponentName = challenges.challenges[i].ChallengeeName;
            isChallenger = true;
        }
        else {
            opponentName = challenges.challenges[i].ChallengerName;
            isChallenger = false;
        }
        var challengerPointsEarned = challenges.challenges[i].ChallengerCurrentPoints - challenges.challenges[i].ChallengerStartPoints;
        var challengeePointsEarned = challenges.challenges[i].ChallengeeCurrentPoints - challenges.challenges[i].ChallengeeStartPoints;
        var status;
        var endDate = new Date(parseInt(challenges.challenges[i].EndDate.substr(6)));
        var startDate = new Date(parseInt(challenges.challenges[i].StartDate.substr(6)));
        var rematchHtml;
        if (endDate > new Date()) {
            status = "Ongoing";
            rematchHtml = "";
        } else {
            if (challengerPointsEarned > challengeePointsEarned) {
                status = isChallenger ? "Win" : "Loss";
            } else if (challengerPointsEarned < challengeePointsEarned) {
                status = isChallenger ? "Loss" : "Win";
            } else {
                status = "Tie";
            }
            rematchHtml = "<input class='btn-danger form-control challenge' value='Rematch!' type='submit' id='" + challenges.challenges[i].ChallengeId + "'/>";
        }
        var yourPointsEarned;
        var opponentsPointsEarned;
        if (isChallenger) {
            yourPointsEarned = challengerPointsEarned;
            opponentsPointsEarned = challengeePointsEarned;
        } else {
            yourPointsEarned = challengeePointsEarned;
            opponentsPointsEarned = challengerPointsEarned;
        }
        challengesHtml +=
            "<div class='row'>" +
                "<div class='col-md-6'>" +
                    "<div class='row'>" +
                        "<div class='col-md-3'><p>" +
                            opponentName +
                        "</p></div>" +
                        "<div class='col-md-3'><p>" +
                            challenges.challenges[i].ChampionName +
                        "</p></div>" +
                        "<div class='col-md-3'><p>" +
                            status +
                        "</p></div>" +
                        "<div class='col-md-3'><p>" +
                            $.datepicker.formatDate("mm/dd/yy", startDate) +
                        "</p></div>" +
                    "</div>" +
                "</div><div class='col-md-6'>" +
                    "<div class='row'>" +
                        "<div class='col-md-3'><p>" +
                            $.datepicker.formatDate("mm/dd/yy", endDate) +
                        "</p></div>" +
                        "<div class='col-md-3'><p>" +
                            yourPointsEarned +
                        "</p></div>" +
                        "<div class='col-md-3'><p>" +
                            opponentsPointsEarned +
                        "</p></div>" +
                        "<div class='col-md-3'>" + rematchHtml + "</div>" +
                    "</div>" +
                "</div>" +
            "</div>";
    }
    $("#challengesList").html(challengesHtml);
}

//function showChallengeProgress(data, challengeId) {
//    if (typeof data != "undefined" && data != null && typeof data.championId != "undefined") {
//        var row = $("#" + challengeId).closest(".row");
//        var headerHtml = getChallengeProgressHeaderHtml();
//        row.after(
//            "<div id='" + challengeId + "Progress'>" +
//                headerHtml +
//                "<div class='row'>" +
//                    "<div class='col-md-3 col-sm-3 col-xs-12'>" +
//                        "" +
//                    "</div>" +
//                    "<div class='col-md-3 col-sm-3 col-xs-12'>" +
//                        "" +
//                    "</div>" +
//                    "<div class='col-md-3 col-sm-3 col-xs-12'>" +
//                        "" +
//                    "</div>" +
//                    "<div class='col-md-3 col-sm-3 col-xs-12'>" +
//                        "" +
//                    "</div>" +
//                "</div>" +
//            "</div>");
//    } else {

//    }
//}

//function getChallengeProgressHeaderHtml() {
//    return "<div class='row'>" +
//                "<div class='col-md-3 col-sm-3 col-xs-12'>" +
//                    "<h4>Status</h4>" +
//                "</div>" +
//                "<div class='col-md-3 col-sm-3 col-xs-12'>" +
//                    "<h4>Your Points Earned</h4>" +
//                "</div>" +
//                "<div class='col-md-3 col-sm-3 col-xs-12'>" +
//                    "<h4>Opponent's Points Earned</h4>" +
//                "</div>" +
//                "<div class='col-md-3 col-sm-3 col-xs-12'>" +
//                    "<h4>Hide Progress</h4>" +
//                "</div>" +
//            "</div>";
//}

//SUBMIT

function submitChallenge(summonerId, endDate, championId) {
    alert("TODO");
    //var dataToSend = {
    //    SummonerId: summonerId,
    //    EndDate: endDate,
    //    ChampionId: championId
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