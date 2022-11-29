const modalLoading = `
<div id="modal-loading" class="absolute top-0 right-0 h-screen w-screen flex flex-col gap-4 items-center justify-center bg-black bg-opacity-30">
    <img src="./src/loading.png" alt="" class="h-10 w-10 animate-spin" />
</div>`;

const modalForm = `<div
id="modal"
class="absolute top-0 right-0 h-screen w-screen flex flex-col gap-4 items-center justify-center bg-black bg-opacity-30"
>
<button class="text-white font-bold" id="close-modal">CLOSE</button>
<div
  class="bg-white w-full md:w-[50%] min-h-[500px] rounded-sm shadow-xl p-5"
>
  <h1 class="text-xl font-bold text-center mb-10" id="modal-title"></h1>
  <form action="" class="flex flex-col gap-4" id="modal-form">
    <div class="flex items-start">
      <label for="title" class="w-[20%]">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        class="flex-1 px-2 py-1 border outline-none"
        required
      />
    </div>
    <div class="flex items-start">
      <label for="body" class="w-[20%]">Body</label>
      <textarea
        rows="10"
        class="flex-1 px-2 py-1 border outline-none"
        id="body"
        required
      ></textarea>
    </div>
    <div class="flex items-center">
      <label for="publish" class="w-[20%]">Publish</label>
      <input type="checkbox" id="publish" />&nbsp;Yes
    </div>
    <button class="bg-gray-100 py-3 rounded-sm hover:opacity-70">
      SAVE
    </button>
  </form>
</div>
</div>`;

$("body").append(modalLoading);
$("body").append(modalForm);
