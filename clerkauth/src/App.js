// import { useAuth, useUser } from "@clerk/clerk-react";
// import { useEffect, useState } from "react";

// function App() {
//   const { getToken, isLoaded, isSignedIn } = useAuth();
//   const { user } = useUser();
//   const [backendData, setBackendData] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       if (!isLoaded || !isSignedIn) return;

//       try {
//         const token = await getToken({ template: "my_jwt" }); // JWT template name
//         console.log("Token:", token); // ✅ You can copy this into Postman too

//         const res = await fetch("http://localhost:3001/api/users", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         setBackendData(data);
//       } catch (err) {
//         console.error("Error calling backend:", err);
//       }
//     };

//     fetchUsers();
//   }, [getToken, isLoaded, isSignedIn]);

//   return (
//     <div>
//       <h1>Welcome, {user?.firstName}!</h1>
//       <h2>Users from Backend:</h2>
//       <pre>{JSON.stringify(backendData, null, 2)}</pre>
//     </div>
//   );
// }

// export default App;




// // src/App.js
// import React from "react";
// import { SignIn, SignUp, UserButton, useUser } from "@clerk/clerk-react";
// import { Routes, Route, Link } from "react-router-dom";

// function Home() {
//   const { user } = useUser();
//   return (
//     <div>
//       <h1>Welcome {user ? user.fullName : "Guest"}!</h1>
//       <UserButton />
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <>
//       <nav>
//         <Link to="/">Home</Link> | <Link to="/sign-in">Sign In</Link> |{" "}
//         <Link to="/sign-up">Sign Up</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
//         <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
//       </Routes>
//     </>
//   );
// }
import React, { useEffect } from "react";
import {
  SignIn,
  SignUp,
  UserButton,
  useUser,
  useAuth,
} from "@clerk/clerk-react";
import { Routes, Route, Link } from "react-router-dom";

function Home() {
  const { user, isSignedIn } = useUser();
  const { getToken, isLoaded } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      if (isLoaded && isSignedIn) {
        try {
          const token = await getToken(); // You can add { template: "your-template-name" } if needed
          console.log("JWT Token:", token);

          // Example: Call your backend with token
          const response = await fetch("http://localhost:3001/api/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          console.log("Backend data:", data);
        } catch (error) {
          console.error("Failed to fetch token or backend:", error);
        }
      }
    };

    fetchToken();
  }, [isLoaded, isSignedIn, getToken]);

  return (
    <div>
      <h1>Welcome {user ? user.fullName : "Guest"}!</h1>
      <UserButton />
    </div>
  );
}

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/sign-in">Sign In</Link> |{" "}
        <Link to="/sign-up">Sign Up</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up"
          element={<SignUp routing="path" path="/sign-up" />}
        />
      </Routes>
    </>
  );
}
