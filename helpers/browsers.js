const { devices } = require("@playwright/test");

class BrowserConfig {
  constructor() {
    this.browsers = {
      chromium: "chromium",
      firefox: "firefox",
      webkit: "webkit",
      edge: "msedge",
    };

    this.devicesConfig = {
      "Desktop Chrome": devices["Desktop Chrome"],
      iPad: devices["iPad"],
      "Pixel 5": devices["Pixel 5"],
    };
  }

  getBrowsers() {
    return this.browsers;
  }

  getDevicesConfig() {
    return this.devicesConfig;
  }

  getBrowser(browserName) {
    return this.browsers[browserName] || this.browsers.chromium;
  }

  getDeviceConfig(deviceName) {
    return (
      this.devicesConfig[deviceName] || this.devicesConfig["Desktop Chrome"]
    );
  }
}

module.exports = new BrowserConfig();
