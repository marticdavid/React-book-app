//store context

import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const storeContext = createContext();
// const navigate = useNavigate()

export const StoreProvider = ({ children }) => {
  //define variables
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [books, setBooks] = useState([]);
  const [singleBook, setSingleBook] = useState(null);
 const [profile, setProfile] = useState(false);
 const [showForm, setShowForm] = useState(false);
 const [updateProfile, setUpdateProfile] = useState(false); 

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  function isTokenExpired(token) {
    if (!token) return;

    try {
      const [, payload] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.exp * 1000 < Date.now();
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    //fetch token from local storage
    const localStorageToken = localStorage.getItem("bookApp_token");
    console.log(localStorageToken);
    const tokenExpiryStatus = isTokenExpired(localStorage.getItem("bookApp_token")); //verifico se il token è scaduto (data di scadentora)
    if ( tokenExpiryStatus === false) {
      console.log(localStorageToken);
      setToken(localStorageToken);
      setAuth(true);
    } else{
      setAuth(false);
      localStorage.removeItem("bookApp_token");

      // if ("bookApp_token" === null) {
      //   navigate("/login")
        
      // }
    }
  }, []);

async function fetchProfile() {
   try {
    const response = await fetch(`${apiUrl}/profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bookApp_token")}`,
      },
    });
    

    const data = await response.json();
    console.log(data);
    setProfile(data.profiles);

   } catch (error) {
    
   }
    
  }

  async function handleUpdateSubmit(e) {
    try {
      e.preventDefault();

      const response = await fetch(`${apiUrl}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bookApp_token")}`,
        },
        body: JSON.stringify({ userName: username, bio }),
      });

      const data = await response.json(); 

      if (response.ok) {
        setUpdateProfile();
        toast.success("Profile updated successfully!");
        setShowForm(false);
        fetchProfile(); // Refresh profile
      } else {
        toast.error(data.message || "Update failed.");
      }
    } catch (error) {
      
    }
  }
  async function fetchBooks() {
    try {
      const res = await fetch("http://localhost:7000/book/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bookApp_token")}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to fetch books:", errorData.message);
        return;
      }

      const data = await res.json();
          console.log(data);
           setBooks(data.books);
           setIsLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  

  // async function fetchBooks() {
  //   try {
  //     setIsLoading(true);
  //     console.log(token)
  //     const response = await fetch(`${apiUrl}/book/`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization:`Bearer ${token}`,
  //       },
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //     setBooks(data.books);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
      
  //   }

  // }
  async function fetchBook(bookId) {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/book/${bookId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bookApp_token")}`,
        },

      });

      const data = await response.json();
      setSingleBook(data.book);
      console.log(data.book)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

  }


  //exporting states/functions/data
  const contextObj = {
    auth,
    setAuth,
    setIsLoading,
    isLoading,
    apiUrl,
    password,
    setPassword,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    userName,
    setUserName,
    token,
    setToken,
    fetchBooks,
    books,
    fetchBook,
    singleBook,
    fetchProfile,
    profile,
    setProfile,
    handleUpdateSubmit,
  };

  return (
    <storeContext.Provider value={contextObj}>{children}</storeContext.Provider>
  );
};