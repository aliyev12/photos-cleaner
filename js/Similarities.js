const fs = require("fs");
const path = require("path");
// const heic2any = require("heic2any");
const { spawn } = require("child_process");
const log = require("simple-node-logger").createSimpleFileLogger("project.log");

class Similarities {
  constructor(window) {
    this.window = window;
    this.similarities = [];
  }

  getSimilarities() {
    return [...this.similarities];
  }

  getImageFeatureVectors() {
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn(
      `/Users/abdulaliyev/web-projects/electron/photos-cleaner/photos_cleaner_env/bin/python`,
      [
        "-u",
        path.join(
          "/Users/abdulaliyev/web-projects/electron/photos-cleaner",
          "get_image_feature_vectors.py"
        ),
        "/Users/abdulaliyev/web-projects/del/imgs/2/*.jpg",
      ]
    );
    // collect data from script
    python.stdout.on("data", function (data) {
      dataToSend = data.toString();
    });
    python.on("error", (err) => {
      console.log("err = ", err);
    });
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      this.runCluster();
    });
  }

  runCluster() {
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn(
      `/Users/abdulaliyev/web-projects/electron/photos-cleaner/photos_cleaner_env/bin/python`,
      [
        "-u",
        path.join(
          "/Users/abdulaliyev/web-projects/electron/photos-cleaner",
          "cluster_image_feature_vectors.py"
        ),
      ]
    );
    // collect data from script
    python.stdout.on("data", function (data) {
      dataToSend = data.toString();
    });
    python.on("error", (err) => log.error(err));
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      if (dataToSend) {
        const parsedData = JSON.parse(dataToSend);
        this.window.webContents.send(
          "similarities_analysis_completed",
          parsedData
        );
        this.similarities = parsedData;
      }
    });
  }
}

module.exports = Similarities;
