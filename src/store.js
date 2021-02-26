import { writable } from "svelte/store";

export const SimilaritiesStatuses = {
  initial: "initial",
  loading: "loading",
  received: "received",
};

export const mementoes = writable([]);
export const similarities = writable([]);
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
