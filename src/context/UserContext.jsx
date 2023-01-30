import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const clean = onAuthStateChanged(auth, (newUser) => setUser(newUser));

    return () => {
      clean();
    };
  }, []);
  const saveHandler = () => {
    let isSuccess = false;

    //legal flows cannot have edges lower than n-1
    if (edges.length >= nodes.length - 1) {
      let targets = {};
      let uniqueTargetsCount = 0;

      //if targets doesn't have an edge's target node, it must be new so add it to unique count
      edges.forEach((edge) => {
        if (!targets[edge.target]) {
          targets[edge.target] = true;
          uniqueTargetsCount += 1;
        }
      });

      if (uniqueTargetsCount >= nodes.length - 1) {
        isSuccess = true;
      }
    }

    setStatus({
      showStatus: true,
      status: isSuccess,
      value: isSuccess ? "Flow saved" : "Cannot save Flow",
    });

    setTimeout(() => {
      setStatus({ showStatus: false });
    }, 5000);
  };

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };
