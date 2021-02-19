const fs = require("fs");
const path = require("path");
const heic2any = require("heic2any");
const { spawn, exec } = require("child_process");

let similarities = [];

getUserInput();

function getUserInput() {
  let dirName = "";

  const form = document.getElementById("user-selection-form");
  const directoryInput = document.getElementById("directory-input");
  if (form && directoryInput) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("directoryInput.value = ", directoryInput.value);
    });
  }
}

// getImageFeatureVectors();

function getImageFeatureVectors() {
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn(`${__dirname}/photos_cleaner_env/bin/python`, [
    "-u",
    path.join(__dirname, "get_image_feature_vectors.py"),
    "/Users/abdulaliyev/web-projects/del/imgs/2/*.jpg",
  ]);

  // collect data from script
  python.stdout.on("data", function (data) {
    dataToSend = data.toString();
  });
  python.on("error", (err) => console.log("err = ", err));
  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    console.log("dataToSend = ", dataToSend);
    runCluster();
  });
}

function runCluster() {
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn(`${__dirname}/photos_cleaner_env/bin/python`, [
    "-u",
    path.join(__dirname, "cluster_image_feature_vectors.py"),
  ]);

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
    similarities = JSON.parse(dataToSend);
    console.log("similarities = ", similarities);
    buildLis(similarities);
  });
}

function buildLis(arr) {
  const list = document.getElementById("list");
  if (list) {
    arr.forEach((similarFiles, i) => {
      const li = `
    <li class='list-item list-item-${i}'></li>
    `;
      list.insertAdjacentHTML("beforeend", li);
      buildImgContainers(similarFiles, i);
    });
  }
}

function buildImgContainers(similarFiles, i) {
  similarFiles.forEach(async (filePath) => {
    const ext = path.extname(filePath);
    if (ext === ".heic") {
      await fetch(filePath)
        .then((res) => res.blob())
        .then((blob) =>
          heic2any({
            blob,
            toType: "image/jpeg",
            quality: 0.5, // cuts the quality and size by half
          })
        )
        .then((conversionResult) => {
          var url = URL.createObjectURL(conversionResult);
          const imgContainerDiv = `
            <div class='img-container'>
                <img width="200" src='${url}'/>
            </div>
            `;
          const listItem = document.querySelector(`.list-item-${size}`);
          if (listItem) {
            listItem.insertAdjacentHTML("beforeend", imgContainerDiv);
          }
        });
    } else {
      const imgContainerDiv = `
          <div class='img-container'>
              <img width="200" src='file://${filePath}'/>
              <p>${filePath}</p>
          </div>
          `;
      const listItem = document.querySelector(`.list-item-${i}`);
      if (listItem) {
        listItem.insertAdjacentHTML("beforeend", imgContainerDiv);
      }
    }
  });
}

// // Compare files based on names
// function buildImgContainers(duplicateSizes, size) {
//   duplicateSizes[size].forEach(async (filePath) => {
//     const ext = path.extname(filePath);
//     if (ext === ".heic") {
//       await fetch(filePath)
//         .then((res) => res.blob())
//         .then((blob) =>
//           heic2any({
//             blob,
//             toType: "image/jpeg",
//             quality: 0.5, // cuts the quality and size by half
//           })
//         )
//         .then((conversionResult) => {
//           var url = URL.createObjectURL(conversionResult);
//           const imgContainerDiv = `
//             <div class='img-container'>
//                 <img width="200" src='${url}'/>
//             </div>
//             `;
//           const listItem = document.querySelector(`.list-item-${size}`);
//           if (listItem) {
//             listItem.insertAdjacentHTML("beforeend", imgContainerDiv);
//           }
//         });
//     } else {
//       const imgContainerDiv = `
//           <div class='img-container'>
//               <img width="200" src='file://${filePath}'/>
//           </div>
//           `;
//       const listItem = document.querySelector(`.list-item-${size}`);
//       if (listItem) {
//         listItem.insertAdjacentHTML("beforeend", imgContainerDiv);
//       }
//     }
//   });
// }

// function readDir() {
//   const pwd = `/Users/abdulaliyev/Pictures/june-2020`;

//   fs.readdir(pwd, (err, files) => {
//     const fileSizes = {};
//     const duplicateSizes = {};

//     files.forEach((file) => {
//       // console.log(file);
//       var stats = fs.statSync(`${pwd}/${file}`);
//       var fileSizeInBytes = stats.size;
//       if (fileSizes[fileSizeInBytes]) {
//         fileSizes[fileSizeInBytes] = [
//           ...fileSizes[fileSizeInBytes],
//           `${pwd}/${file}`,
//         ];
//       } else {
//         fileSizes[fileSizeInBytes] = [`${pwd}/${file}`];
//       }
//     });

//     Object.keys(fileSizes).forEach((key) => {
//       if (fileSizes[key].length > 1) {
//         duplicateSizes[key] = fileSizes[key];
//       }
//     });

//     populateList(duplicateSizes);
//   });
// }

// function populateList(duplicateSizes) {
//   const list = document.getElementById("list");
//   if (list) {
//     Object.keys(duplicateSizes).forEach((size, i) => {
//       const li = `
//     <li class='list-item list-item-${i}'></li>
//     `;
//       list.insertAdjacentHTML("beforeend", li);
//       buildImgContainers(duplicateSizes, size);
//     });
//   }
// }
