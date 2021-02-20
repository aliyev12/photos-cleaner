const fs = require("fs");
const path = require("path");
const heic2any = require("heic2any");
const { spawn } = require("child_process");

class Similarities {
  constructor() {
    this.similarities = [];
  }

  getImageFeatureVectors() {
    fs.appendFile(
      "logs.txt",
      "running getImageFeatureVectors... \n",
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
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
    fs.appendFile(
      "logs.txt",
      ">> getImageFeatureVectors >> python spawned... \n",
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
    // collect data from script
    python.stdout.on("data", function (data) {
      dataToSend = data.toString();
      fs.appendFile(
        "logs.txt",
        `>> getImageFeatureVectors >> dataToSend = ${dataToSend} \n`,
        function (err) {
          if (err) throw err;
          console.log("Saved!");
        }
      );
    });
    python.on("error", (err) => {
      fs.appendFile(
        "logs.txt",
        `>> getImageFeatureVectors >> error = ${JSON.stringify(err)} \n`,
        function (err) {
          if (err) throw err;
          console.log("Saved!");
        }
      );

      console.log("err = ", err);
    });
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      console.log("dataToSend = ", dataToSend);
      fs.appendFile(
        "logs.txt",
        `getImageFeatureVectors... dataToSend = ${JSON.stringify(
          dataToSend
        )} \n`,
        function (err) {
          if (err) throw err;
          console.log("Saved!");
        }
      );
      this.runCluster();
    });
  }

  runCluster() {
    fs.appendFile("logs.txt", "running runCluster... \n", function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
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
    fs.appendFile("logs.txt", "runCluster >> spawn ran... \n", function (err) {
      if (err) throw err;
      console.log("Saved!");
    });

    // collect data from script
    python.stdout.on("data", function (data) {
      dataToSend = data.toString();
    });
    python.on("error", (err) => console.log("err = ", err));
    // in close event we are sure that stream from child process is closed
    python.on("close", (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      console.log("dataToSend from cluster = ", dataToSend);
      this.similarities = JSON.parse(dataToSend);
    });
  }
}

module.exports = Similarities;
