import { useEffect, useRef, useState } from "react";
import "./App.css";
import Alert from "./Components/Alert";
import Topbar from "./Components/Topbar";
import UserLists from "./Components/UserLists";
import Visibility from "./Components/Visibility";
import getUser from "./Tools/Client";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState("");
  const ref = useRef([]);

  const validateResponse = (res) => {
    if (!("data" in res)) return false;
    if (Object.keys(res.data).length > 0) return true;
    return false;
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getUser();
      if (!validateResponse(response)) throw new Error("No such data.");
      setData(response.data);
    } catch (e) {
      setAlert(`Failed to fetch user. Details: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const searchUser = (e) => {
    e.preventDefault();
    const search = e.target.value;
    if (search.length === 0) {
      fetchUser();
    }
    const filtered = data.filter((user) => {
      return (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.website.toLowerCase().includes(search.toLowerCase())
      );
    });
    setData(filtered);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Visibility elem={ref} />
      <Topbar onSearch={searchUser} />
      <Alert message={alert} state={alert} />
      <Alert state={loading} message="Loading..." />
      <UserLists state={data} elemRef={ref} />
    </div>
  );
}
