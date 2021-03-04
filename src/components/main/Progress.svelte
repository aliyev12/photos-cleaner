<script>
  const { ipcRenderer } = require("electron");
  import Spinner from "../utils/spinner.svelte";

  const progressData = {
    initialized: false,
    total: 0,
    completed: 0,
    percent: 0,
  };

  ipcRenderer.on("start_progress", (e, totalNumOfAllItems) => {
    const parsed = parseInt(totalNumOfAllItems);
    progressData.initialized = true;
    progressData.total = parsed;
  });

  ipcRenderer.on("completed_item_index", (e, completedItemIndex) => {
    const parsed = parseInt(completedItemIndex) + 1;
    progressData.completed = parsed;
    progressData.percent = Math.round((parsed / progressData.total) * 100);
  });
</script>

<div class="flex justify-center  w-full">
  <div class="shadow bg-success-200 rounded-2xl" style="width: 1200px;">
    <div
      class="bg-success-800 flex justify-center text-2xl leading-none py-4 text-center text-white rounded-tl-2xl rounded-bl-2xl {progressData.percent ===
      100
        ? 'rounded-2xl'
        : ''}"
      style="width: {progressData.percent}%; height: 35px;"
    >
      {#if progressData.percent >= 5}
        <div class="flex align-middle">
          <span class="mr-5">{progressData.percent}%</span>
          <Spinner />
        </div>
      {/if}
    </div>
  </div>
</div>
