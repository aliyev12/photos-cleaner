<script>
  import mainController from "./mainController.js";
  import { rootFolderPath } from "../../store.js";

  $: console.log("rootPath = ", $rootFolderPath);
</script>

<main>
  <form action="#" method="POST">
    <div class="shadow sm:rounded-md sm:overflow-hidden m-5">
      <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
        <div>
          <label for="about" class="block text-sm font-medium text-gray-700">
            Root Path
          </label>
          <div class="mt-1">
            <input
              bind:value={$rootFolderPath}
              type="text"
              name="first_name"
              id="first_name"
              autocomplete="given-name"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1"
            />
          </div>
          <p class="mt-2 text-sm text-gray-500">
            Provide root directory path where to start analyzing photos
          </p>
        </div>

        <div class="px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
</main>
