import { writable } from "svelte/store";

export const mementoes = writable([]);
export const similarities = writable(dummyData());
export const rootFolderPath = writable("hi");

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
