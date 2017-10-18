chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    sendVend(function (status) {
      if (status == 200) {
        document.getElementById('loader').src = 'assets/images/good.png';
      } else {
        document.getElementById('loader').src = "assets/images/bad.png";
      }

    }, request.source);
  }
});

function onWindowLoad() {
  var message = document.querySelector('#message');
  chrome.tabs.executeScript(null, {
    file: "assets/js/getPagesSource.js"
  }, function () {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

function sendVend(callback, data) {
  var x = new XMLHttpRequest();
  x.open("POST", "http://cubbychaser.herokuapp.com/createSession", true);
  x.onreadystatechange = function () {
    if (x.readyState == 4) {
      callback(x.status);
    }
  };
  x.send(data);
}

window.onload = onWindowLoad;