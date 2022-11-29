const createDetailPage = (data) => {
  $("#root").html(`<div class="text-center mt-10">
  <h1 class="text-xl font-bold" id="post-title">Blog Title</h1>
  <span class="text-sm mt-4 block" id="post-detail"
    >By Jokowi at Januari 2019</span
  >
</div>
<img
  src="https://img.freepik.com/free-vector/black-white-grunge-paint-background_1409-1576.jpg?w=2000"
  alt=""
  class="h-[350px] w-full object-cover"
/>

<div class="px-16 md:px-0 flex flex-col space-y-4" id="post-body"></div>
<div class="px-16 md:px-0 flex flex-col space-y-4">
  <h2 class="text-xl font-bold">Comments</h2>
  <div class="flex flex-col space-y-2" id="post-comments"></div>
  <h2 class="text-xl font-bold">Say Something</h2>
  <form action="" class="w-full flex flex-col gap-4" id="form-comment">
    <textarea
      name=""
      rows="10"
      class="px-2 py-1 border outline-none w-full"
      id="message"
    ></textarea>
    <button
      class="bg-gray-100 px-4 py-2 rounded-sm hover:opacity-70 self-end"
    >
      Comment
    </button>
  </form>
</div>`);
};

export default createDetailPage;
