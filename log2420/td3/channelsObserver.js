var channelsList = [];
var channelsIdList = [];
var currentChannelId = "";

function updateChannelsList(message) {
  retrieveChannelList(message);

  let channelsListDOM = document.getElementById("channels-list");
  console.log(channelsListDOM);
  channelsListDOM.innerHTML = "";
  
  for (const channel in channelsList) {
    let darkness = (channel % 2 === 0) ? "dark" : "light";
    channelsListDOM.innerHTML += setChannelDOM(channelsList[channel].name, channelsList[channel].id, darkness);
  }

  setPlusMinusIcon();
}

function retrieveChannelList(message) {
  for (i = 0; i < message.data.length; ++i) {
    if (!channelsIdList.includes(message.data[i].id)) {
      channelsIdList.push(message.data[i].id);
      channelsList.push(message.data[i]);
    }
  }
  console.log(channelsList);
}

function setChannelDOM(channelName, channelId, darkness) {
  htmlBlock = "";
  if (channelName === "Général") {
    currentChannelId = channelId;
    htmlBlock += "<div class='group " + darkness + "' onclick=";
    htmlBlock += "\"loadMessages(" + "'" + channelId + "'" + ")\">";
    htmlBlock += "<i id='star' class='fas fa-star'></i>";
    htmlBlock += "<div id='group-name'>Général</div>";
    htmlBlock += "<div id='group-default'>";
    htmlBlock += "<span id='group-text-default'>défaut</span>";
    htmlBlock += "</div></div>";
  } else {
    htmlBlock += "<div class='group " + darkness + "' onclick=";
    htmlBlock += "\"loadMessages(" + "'" + channelId + "'" + ")\">";
    htmlBlock += "<i class='plus-minus-icon fas fa-plus color-plus channel-icon' onclick=";
    htmlBlock += "\"joinChannel(" + "'" + channelId + "'" + ")\"></i>";
    htmlBlock += "<div id='group-name'>" + channelName + "</div>";
    htmlBlock += "<div></div>";
    htmlBlock += "</div>";
  }

  return htmlBlock;
}

function setPlusMinusIcon() {
  const icons = document.getElementsByClassName("plus-minus-icon");

  for (i = 1; i < channelsList.length; i++) {
    if (channelsList[i].joinStatus) {
      console.log(channelsList[i].joinStatus);
      icons[i-1].className = "plus-minus-icon fas fa-minus color-minus channel-icon";
    } else {
      icons[i-1].className = "plus-minus-icon fas fa-plus color-plus channel-icon";
    } 
  }
}

/*function joinChannel(message) {
  const icons = document.querySelectorAll(".plus-minus-icon");
  console.log(message);
  for (i = 0; i < message.data.length(); ++i) {
    if (message.data[i].joinStatus = true) {
      for (const icon of icons) {
        icon.className = "fas fa-minus color-minus channel-icon"
      } 
    } else {
      for (const icon of icons) {
        icon.className = "fas fa-plus color-plus channel-icon"
      } 
    }
  }
}*/

/*function joinOrLeaveChannel(channel) {

}


function joinOrLeaveChannel(channel) {
  console.log("join or leave");
  $("#allo").click(function () {
      if ($(this).hasClass("color-plus") && $(this).hasClass("fa-plus")) {
          joinChannel(channel);
          console.log("join");
      } else
      leaveChannel(channel);
  });
}*/
