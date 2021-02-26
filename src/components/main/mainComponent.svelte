<script>
  const { ipcRenderer } = require("electron");
  // import mainController from "./mainController.js";
  import {
    rootFolderPath,
    similarities,
    SimilaritiesStatuses,
    similaritiesStatus,
    similarityPercentage,
  } from "../../store.js";

  import Spinner from "../utils/spinner.svelte";
  // import { createEventDispatcher } from "svelte";
  // const dispatch = createEventDispatcher();

  $: console.log("rootPath = ", $rootFolderPath);
  $: console.log("similarities from store = ", $similarities);
  $: console.log("similaritiesStatus from store = ", $similaritiesStatus);

  ipcRenderer.on("similarities_analysis_completed", (e, newSimilarities) => {
    similarities.set(newSimilarities);
    similaritiesStatus.set(SimilaritiesStatuses.received);
  });

  // const doStuff = async () => {
  //   const request = await fetch("http://localhost:4242");
  //   const response = await request.json();

  //   console.log("response = ", response);
  //   something_ = response.msg;
  // };
</script>

<main>
  <form
    method="POST"
    on:submit={(e) => {
      e.preventDefault();
      console.log("29 calling runsimilarities");
      similaritiesStatus.set(SimilaritiesStatuses.loading);
      const stringPercentage = ($similarityPercentage / 100).toString();
      console.log("stringPercentage = ", stringPercentage);
      ipcRenderer.send("runsimilarities", stringPercentage);
    }}
  >
    <!-- <div class="bg-white dark:bg-gray-800">
    <h1 class="text-gray-900 dark:text-white">Dark mode is here!</h1> -->

    <div class="shadow sm:rounded-md sm:overflow-hidden m-5">
      <div class="px-4 py-5 bg-white dark:bg-gray-800 space-y-6 sm:p-6">
        <div class="mb-10">
          <label
            for="about"
            class="block text-4xl text-gray-700 dark:text-white mb-5"
          >
            Root Path
          </label>

          <div class="mt-1">
            <input
              bind:value={$rootFolderPath}
              type="text"
              name="first_name"
              id="first_name"
              autocomplete="given-name"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm text-2xl border-gray-300 rounded-md px-1"
            />
          </div>
          <p class="mt-5 text-2xl text-gray-500 dark:text-white">
            Provide root directory path where to start analyzing photos
          </p>
        </div>
        <div>
          <label
            for="similarity_percentage"
            class="block text-4xl text-gray-700 dark:text-white mb-5"
            >Similarity Percentage</label
          >
          <div class="mt-1">
            <input
              bind:value={$similarityPercentage}
              id="similarity_percentage"
              name="similarity_percentage"
              class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-8 w-full"
              type="range"
              min="1"
              max="100"
              step="1"
            />
          </div>
          <p class="mt-5 text-2xl text-gray-500 dark:text-white">
            {$similarityPercentage}%
          </p>
        </div>

        <div class="px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>

  {#if $similaritiesStatus === SimilaritiesStatuses.loading}
    <Spinner />
  {/if}

  <div class="m-5 mt-12">
    {#each $similarities as groupOfImages, i}
      <div
        class="flex flex-row p-10 h-96 border border-white border-opacity-100 mb-10 rounded-lg overflow-x-auto"
      >
        {#each groupOfImages as image}
          <div class="flex flex-col rounded pr-5 w-80 flex-shrink-0">
            <img
              src="file://{image}"
              alt={image}
              class="rounded h-full object-cover "
            />
            <!-- <p>{image}</p> -->
          </div>
        {/each}
      </div>
    {/each}
  </div>
</main>

<style>
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    input[type="range"]::-webkit-slider-thumb {
      width: 15px;
      -webkit-appearance: none;
      appearance: none;
      height: 15px;
      cursor: ew-resize;
      background: #fff;
      box-shadow: -405px 0 0 400px #605e5c;
      border-radius: 50%;
    }
  }
</style>
