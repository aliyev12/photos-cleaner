import { writable } from "svelte/store";

export const SimilaritiesStatuses = {
  initial: "initial",
  loading: "loading",
  received: "received",
};

export const mementoes = writable([]);
export const similarities = writable([]);
export const statusMessages = writable([]);
export const similarityPercentage = writable(96);
export const rootFolderPath = writable("hi");
export const similaritiesStatus = writable(SimilaritiesStatuses.initial);

function dummyData() {
  return [
    [
      "/Users/abdulaliyev/web-projects/del/imgs/2/dc_copy_2.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/dc_copy_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/dc_copy_1.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/dc_copy_2.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/dc_copy_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/dc_copy_1.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/dc_copy_2.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/dc_copy_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/dc_copy_1.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/dc_copy_2.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/dc_copy_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/dc_copy_1.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/2/bb_copy_2.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/bb_copy_1.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/2/bb_copy_3.jpg",
    ],
  ];
}
function dummyData2() {
  return [
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_M_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_J_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/green_bb_M_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/j/green_bb_J_5.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_M_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/green_bb_M_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/j/green_bb_J_0.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_J_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_M_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/green_bb_M_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/j/green_bb_J_5.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/green_bb_M_2.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/j/green_bb_J_1.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/green_bb_M_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_M_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_J_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/j/green_bb_J_5.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/green_bb_M_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_M_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/j/green_bb_J_0.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/me_and_bb/bb_copy_1.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/me_and_bb/bb_copy_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/me_and_bb/bb_copy_2.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/me_and_bb/bb_copy_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/me_and_bb/bb_copy_1.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/me_and_bb/bb_copy_2.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/me_and_bb/bb_copy_2.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/me_and_bb/bb_copy_1.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/me_and_bb/bb_copy_3.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/j/green_bb_J_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_M_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_J_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/green_bb_M_3.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/j/green_bb_J_1.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/green_bb_M_2.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/j/green_bb_J_0.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_M_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/green_bb_M_5.jpg",
    ],
  ];
}
function dummyData3() {
  return [
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/1/dc_copy_2.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/1/dc_copy_3.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_M_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_J_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/green_bb_M_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/j/green_bb_J_5.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/ssim/green_bb_M_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/green_bb_M_5.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/j/green_bb_J_0.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/green_bb_M_2.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/j/green_bb_J_1.jpg",
    ],
    [
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/me_and_bb/bb_copy_1.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/me_and_bb/bb_copy_3.jpg",
      "/Users/abdulaliyev/web-projects/del/imgs/6/m/me_and_bb/bb_copy_2.jpg",
    ],
  ];
}
