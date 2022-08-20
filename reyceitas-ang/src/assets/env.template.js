(function(window) {
    window.env = window.env || {};
  
    // Environment variables
    window["env"]["API_URL"] = "${API_URL}";
    window["env"]["CLIENT_ID"] = "${CLIENT_ID}";
  })(this);