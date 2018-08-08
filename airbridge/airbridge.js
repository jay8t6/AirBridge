function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}

var sys = getMobileOperatingSystem();


var AirBridge = (function() {
  var instance;

  function createInstance() {
    var object = new Object();
    object.useWindowLocation = true;
    return object;
  }

  return {
    setUseWindowLocation: function($shouldUseWindowLocation) {
      if (!instance) {
        instance = createInstance();
      }
      instance.useWindowLocation = $shouldUseWindowLocation;
    },

    message: function($message) {
      if (!instance) {
        instance = createInstance();
      }
      if (!instance.useWindowLocation) {
        NativeWebView.airBridge($message);
      } else {
        if (sys == "iOS") {
          window.location = "airBridge:" + $message;
        } else {
          window.location = "http://airBridge:" + $message;
        }
      }
    }
  };
})();
