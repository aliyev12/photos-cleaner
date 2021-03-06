<script>
  const { ipcRenderer } = require("electron");
  import { onMount } from "svelte";
  import moment from "moment";

  import { statusMessages } from "../../store.js";

  function scrollToBottom() {
    const statusMsgScrollContainer = document.getElementById(
      "status-msg-scroll-container"
    );
    if (statusMsgScrollContainer) {
      statusMsgScrollContainer.scrollTop =
        statusMsgScrollContainer.scrollHeight;
    }
  }

  ipcRenderer.on("status_message", (e, newStatusMsg) => {
    if (newStatusMsg.status === "end_similarities_analysis") {
      statusMessages.update((currentStatusMessages) => {
        return [...currentStatusMessages, newStatusMsg];
      });
      setTimeout(() => {
        statusMessages.set([]);
      }, 10000);
    } else {
      statusMessages.update((currentStatusMessages) => {
        return [...currentStatusMessages, newStatusMsg];
      });
      scrollToBottom();
    }
  });

  // status_message
</script>

{#if $statusMessages.length > 0}
  <div class=" m-5 ">
    <h2 class="text-4xl mb-6">Status Updates</h2>
    <div class="rounded-lg bg-neutral-900 min-h-10 w-auto p-8 max-h-96 ">
      <div
        id="status-msg-scroll-container"
        class="flex flex-col text-2xl items-center justify-start  overflow-y-auto max-h-80"
      >
        {#each $statusMessages as statusMessage}
          <div class="flex w-full mb-4">
            <div class="w-30 mr-8 ">
              {moment(statusMessage.time).format("LTS")}
            </div>
            <div class="flex-1">{statusMessage.msg}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
