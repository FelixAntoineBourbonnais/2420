$(document).ready(function () {
    togglePlusMinus();
});


function togglePlusMinus() {
    $("#channelIcon").click(function () {
        $("#channelIcon").toggleClass("colorPlus colorMinus");
        $("#channelIcon").toggleClass("fa-plus fa-minus");
    });
}

function joinChannel() {

}