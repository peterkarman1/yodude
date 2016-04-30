$(document).ready(function () {
    $("#summonerSearchSubmit").on("click", function (e) {
        e.preventDefault();
        var name = $("#summonerSearchText").val();
        var summonerInfo = getSummonerInfo(name);
        console.log(summonerInfo);
    })
});