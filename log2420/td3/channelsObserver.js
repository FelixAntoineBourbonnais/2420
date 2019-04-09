var channelsList = [];
var channelsIdList = [];
var currentChannelId = "";

function updateChannelsList(message) {
  retrieveChannelList(message);

  let channelsListDOM = document.getElementById("channels-list");
  channelsListDOM.innerHTML = "";
  
  for (const channel in channelsList) {
    let darkness = (channel % 2 === 0) ? "dark" : "light";
    channelsListDOM.innerHTML += setChannelDOM(channelsList[channel].name, channelsList[channel].id, darkness);
    console.log(channelsList[channel].name);
  }
  document.getElementById("current-channel").innerText = getChannelNameFromId(currentChannelId);
  setPlusMinusIcon();
}

function retrieveChannelList(message) {
  for (i = 0; i < message.data.length; ++i) {
    if (!channelsIdList.includes(message.data[i].id)) {
      channelsIdList.push(message.data[i].id);
      channelsList.push(message.data[i]);
    } else {
      channelsList[i].joinStatus = message.data[i].joinStatus;
      channelsList[i].numberOfUsers = message.data[i].numberOfUsers;
    }
  }
}

function setChannelDOM(channelName, channelId, darkness) {
  htmlBlock = "";
  if (channelId === "dbf646dc-5006-4d9f-8815-fd37514818ee") {
    currentChannelId = channelId;
    htmlBlock += "<div class='group " + darkness + "' onclick=";
    htmlBlock += "\"loadMessages(" + "'" + channelId + "'" + ")\">";
    htmlBlock += "<i id='star' class='fas fa-star'></i>";
    htmlBlock += "<div id='group-name'>" + channelName + "</div>";
    htmlBlock += "<div id='group-default'>";
    htmlBlock += "<span id='group-text-default'>default</span>";
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
    console.log(channelsList);
    if (channelsList[i].joinStatus) {
      let onClickAttribute = "leaveChannel('" + channelsList[i].id + "')";
      icons[i-1].className = "plus-minus-icon fas fa-minus color-minus channel-icon";
      icons[i-1].setAttribute("onclick", onClickAttribute);
    }
  }
}

function requestAddNewChannel() {
  let channelName = prompt("Veuillez entrer un nom de groupe:", "Nom de groupe");
  let channelId = generateChannelId();
  for (i = 0; ; i++) {
    if (channelsList[i].id === channelId) {
      channelId = generateChannelId();
    } else {
      break;
    }
  }
  let newChannel = new Channel(channelId, channelName, false, null, 0);
  let date = new Date();
  let message = new Message("onCreateChannel", channelsList[0].id, newChannel, user, date);
  sendText(message);
  console.log("newChannel");
}

function addNewChannel(message) {
  console.log(message);
}