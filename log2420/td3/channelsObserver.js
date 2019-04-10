var channelsList = [];
var channelsIdList = [];
var currentChannelId = "";

/**
 * Updates the local channel list and sets the correct HTML
 * for every channel
 * @param  {Message} message
 */
function updateChannelsList(message) {
  retrieveChannelList(message);
  setDarkness();
  setPlusMinusIcon();
}
/**
 * Sets the darkness of a group
 */
function setDarkness() {
  let channelsListDOM = document.getElementById("channels-list");
  channelsListDOM.innerHTML = "";

  for (const channel in channelsList) {
    let darkness = (channel % 2 === 0) ? "dark" : "light";
    channelsListDOM.innerHTML += setChannelDOM(channelsList[channel].name, channelsList[channel].id, darkness);
    console.log(channelsList[channel].name);
  }
}

/**
 * Adds the new channels to the local list, updates changing parameters
 * of current channels
 * @param  {} message
 */
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

/**
 * Sets a channel in the DOM, with the correct CSS and HTML
 * @param  {string} channelName
 * @param  {string} channelId
 * @param  {string} darkness
 * @return {string} The block of HTML for the channel
 */
function setChannelDOM(channelName, channelId, darkness) {
  htmlBlock = "";
  if (channelId === "dbf646dc-5006-4d9f-8815-fd37514818ee") {
    htmlBlock += "<div class='group " + darkness + "' name='" + channelName +"'>";
    htmlBlock += "<i id='star' class='fas fa-star'></i>";
    htmlBlock += "<div id='group-name'onclick=";
    htmlBlock += "\"getChannel(" + "'" + channelId + "'" + ")\">" + channelName + "</div>";
    htmlBlock += "<div id='group-default' onclick=";
    htmlBlock += "\"getChannel(" + "'" + channelId + "'" + ")\">";
    htmlBlock += "<span id='group-text-default'>default</span>";
    htmlBlock += "</div></div>";
  } else {
    htmlBlock += "<div class='group " + darkness + "' name='" + channelName +"'>";
    htmlBlock += "<i class='plus-minus-icon fas fa-plus color-plus channel-icon' onclick=";
    htmlBlock += "\"joinChannel(" + "'" + channelId + "'" + ")\"></i>";
    htmlBlock += "<div id='group-name' onclick=";
    htmlBlock += "\"getChannel(" + "'" + channelId + "'" + ")\">" + channelName + "</div>";
    htmlBlock += "<div onclick=";
    htmlBlock += "\"getChannel(" + "'" + channelId + "'" + ")\"></div>";
    htmlBlock += "</div>";
  }

  return htmlBlock;
}

/**
 * Toggles correctly the plus and minus icon depending on the context
 * (Weither or not you're in a channel)
 */
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

/**
 * Sends a new channel request to the server
 */
function addNewChannel() {
  /*let channelName = prompt("Veuillez entrer un nom de groupe:", "Nom de groupe");
  let date = new Date();
  let message = new Message("onCreateChannel", channelsList[0].id, channelName, user, date);
  sendText(message);*/

  let date = new Date();
  let testmessage = new Message("onGetChannel", channelsList[0].id, channelsList[0].id, user, date);
  sendText(testmessage);
  console.log("onGetChannel: ");
}
