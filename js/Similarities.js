const fs = require("fs");
const path = require("path");
const os = require("os");
// const heic2any = require("heic2any");
const { spawn } = require("child_process");
const log = require("simple-node-logger").createSimpleFileLogger("project.log");

const rootPath = path.dirname(require.main.filename);
const pyPath = path.join(rootPath, "photos_cleaner_env/bin/python");

class Similarities {
  constructor(window, rootFolderPath, similarityPercentage) {
    this.window = window;
    this.rootFolderPath = rootFolderPath;
    this.similarityPercentage = similarityPercentage;
    this.similarities = [];
  }

  getSimilarities() {
    return [...this.similarities];
  }

  getImageFeatureVectors() {
    const getVectorsPath = path.join(rootPath, "get_image_feature_vectors.py");
    var dataToSend;
    // console.log("this.rootFolderPath = ", this.rootFolderPath);
    // spawn new child process to call the python script
    const python = spawn(pyPath, [
      "-u",
      getVectorsPath,
      this.rootFolderPath,
      // "/Users/abdulaliyev/web-projects/del/imgs/6",
    ]);
    // collect data from script
    python.stdout.on("data", function (data) {
      dataToSend = data.toString();
      // console.log("data = ", data);
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
    var similaritiesResponse;
    const clusterPath = path.join(rootPath, "cluster_image_feature_vectors.py");

    // spawn new child process to call the python script
    const python = spawn(pyPath, [
      "-u",
      clusterPath,
      this.similarityPercentage,
    ]);
    // collect data from script
    python.stdout.on("data", function (data) {
      // console.log("in cluster, received data = ", data.toString());
      similaritiesResponse = data.toString();
    });
    python.on("error", (err) => log.error(err));
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      if (similaritiesResponse) {
        const similaritiesData = JSON.parse(similaritiesResponse);
        this.window.webContents.send(
          "similarities_analysis_completed",
          similaritiesData
        );
        this.similarities = similaritiesData;
      }
    });
  }
}

module.exports = Similarities;
