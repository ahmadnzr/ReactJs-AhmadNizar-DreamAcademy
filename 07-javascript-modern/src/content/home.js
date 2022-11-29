const createHomePage = () => {
  $("#root").html(`<div class="flex items-center justify-between">
    <h1 class="text-xl font-bold">POST</h1>
    <button
    class="bg-gray-100 px-4 py-2 rounded-sm hover:opacity-70"
    id="add-post"
    >
    Add New POST
    </button>
</div>
<table class="display" id="post-table">
    <thead>
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Author</th>
        <th>Created At</th>
        <th>Last Modified</th>
        <th>Published</th>
        <th id="action">Action</th>
    </tr>
    </thead>
    <tbody id="table-body"></tbody>
</table>`);
};

export default createHomePage;
