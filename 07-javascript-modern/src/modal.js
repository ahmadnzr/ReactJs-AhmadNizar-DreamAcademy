const modalLoading = `
<div id="modal-loading" class="absolute top-0 right-0 h-screen w-screen flex flex-col gap-4 items-center justify-center bg-black bg-opacity-30">
    <img src="./src/loading.png" alt="" class="h-10 w-10 animate-spin" />
</div>`;

$("body").append(modalLoading);
