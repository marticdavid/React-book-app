//dashboard

import { useState, useContext, useEffect } from "react";
import { storeContext } from "../context/storeContext";
import { data, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";

function Dashboard() {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [priceRequest, setPriceRequest] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [bookId, setBookId] = useState("")

  const { token, apiUrl, isLoading, setIsLoading, fetchBooks, books } =
    useContext(storeContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  function clearForm() {
    setDescription("");
    setAuthor("");
    setPriceRequest("");
    setCategoryId("");
    setTitle("");
  }

  async function deleteBookHandler(id) {
    try {
      console.log(id, "book id");
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/book/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error("Unable to delete a book, try again later");
        setIsLoading(false);
        console.log(data);
        return;
      }

      toast.success(data.message);
      fetchBooks();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function updateBookHandler() {
    console.log(description, priceRequest, categoryId, author, title);
    setIsLoading(true);
    console.log(token);
    try {
      const response = await fetch(`${apiUrl}/book/update/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          author: author,
          price: Number(priceRequest),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error("Unable to update a book, try again later");
        setIsLoading(false);
        console.log(data);
        return;
      }

      toast.success(data.message);
      fetchBooks(); // update the book list
      clearForm();
      setIsLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function submitBookHandler() {
    console.log(description, priceRequest, categoryId, author, title);
    if (categoryId === "") {
      toast.error("Please select a category");
      return;
    }
    setIsLoading(true);
    console.log(token);
    try {
      const response = await fetch(`${apiUrl}/book/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          author: author,
          price: Number(priceRequest),
          categoryId: categoryId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error("Unable to add a book, try again later");
        setIsLoading(false);
        console.log(data);
        return;
      }

      toast.success(data.message);
      fetchBooks(); // update the book list
      clearForm();
      setIsLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto mt-20 shadow-lg">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <form
        className="bg-white shadow-md mt-14 rounded px-8 pt-6 pb-8 mb-4 mx-auto w-1/2"
        onSubmit={(e) => {
          e.preventDefault();
          editMode ? updateBookHandler() : submitBookHandler();
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Add Book</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Enter price"
            required
            value={priceRequest}
            onChange={(e) => setPriceRequest(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            type="text"
            placeholder="Enter author"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            required
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="1">Politics</option>
            <option value="3">Fiction</option>
            <option value="4">Science</option>
            <option value="5">Art</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className={
              editMode
                ? "text-white-700 bg-brown-500 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                : "bg-blue-500 hover:bg-blue-700 text-white-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            }
            type="submit"
          >
            {editMode ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-4">Book List</h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0
              ? "No books found. please add a book"
              : books.map((book) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={book.id}
                    >
                      <td className="py-4 px-6">{book.title}</td>
                      <td className="py-4 px-6">${book.priceRequest}</td>
                      <td className="py-4 px-6">
                        <Link
                          to={`/book/${book.id}`}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                        >
                          View more
                        </Link>

                        <button
                          onClick={() => {
                            setEditMode(true);
                            setBookId(book.id);
                            setTitle(book.title);
                            setDescription(book.description);
                            setAuthor(book.author);
                            setPriceRequest(book.priceRequest);
                            setCategoryId(book.categoryId);
                          }}
                          type="button"
                          className="text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteBookHandler(book.id);
                          }}
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Dashboard;
