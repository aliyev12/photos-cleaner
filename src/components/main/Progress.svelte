<script>
  const { ipcRenderer } = require("electron");
  import moment from "moment";
  import Spinner from "../utils/spinner.svelte";

  import {
    progressInit,
    progressTotal,
    progressCompleted,
  } from "../../store.js";

  ipcRenderer.on("start_progress", (e, totalNumOfAllItems) => {
    progressInit.set(true);
    progressTotal.set(parseInt(totalNumOfAllItems));
  });

  ipcRenderer.on("completed_item_index", (e, completedItemIndex) => {
    console.log("completedItemIndex = ", completedItemIndex);
    progressCompleted.update(completedItemIndex + 1);
  });
  console.log("progressCompleted  = ", $progressCompleted);
  // figure out why progressCompleted is not updating the ui..
  const percentage =
    $progressCompleted === 0
      ? 0
      : Math.round($progressCompleted / $progressTotal);
  console.log("percentage = ", percentage);
</script>

<div class="flex justify-center  w-full">
  <div class="shadow bg-success-200 rounded-2xl" style="width: 1200px;">
    <div
      class="bg-success-800 flex justify-center text-2xl leading-none py-4 text-center text-white rounded-tl-2xl rounded-bl-2xl {percentage ===
      100
        ? 'rounded-2xl'
        : ''}"
      style="width: {percentage}%; height: 35px;"
    >
      {#if percentage >= 5}
        <div class="flex align-middle">
          <span class="mr-5">{percentage}%</span>
          <Spinner />
        </div>
      {/if}
    </div>
  </div>
</div>
