//React
import { createContext, useContext, useState, useEffect } from "react";

//GraphQL
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

//save my user
interface IProps {
  children: React.ReactNode;
}

interface IContext {
  currentUser: IUser;
  setCurrentUser: (user: IUser) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  setToken: (token: string) => void;
  logout: () => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const UserContext = createContext<Partial<IContext>>({});

const UserProvider = ({ children }: IProps) => {
  //UseState
  const [currentUser, setCurrentUser] = useState<IUser>({ id: "", email: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");

  //Queries
  const { data } = useQuery(GET_CURRENT_USER);

  /*
    check If LoggedIn on reload 
    */
  useEffect(() => {
    if (
      typeof localStorage.getItem("token") !== "undefined" &&
      data &&
      data.currentUser
    ) {
      setCurrentUser({
        id: data.currentUser.id,
        email: data.currentUser.email,
      });
      setLoggedIn(true);
      setTheme(data.currentUser.theme);
    }
  }, [data]);

  useEffect(() => {
    if (currentUser && currentUser?.id !== "") setLoggedIn(true);
  }, [currentUser]);

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setCurrentUser({ id: "", email: "" });
    setLoggedIn(false);
    setTheme("light");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loggedIn,
        setLoggedIn,
        setToken,
        logout,
        theme,
        setTheme,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
