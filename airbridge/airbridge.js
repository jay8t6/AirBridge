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
				window.location = "http://airBridge:" + $message;
			}
		}
	};
})();
