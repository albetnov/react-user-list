import { createRef, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import Alert from "./Components/Alert";
import Topbar from "./Components/Topbar";
import UserLists from "./Components/UserLists";
import Visibility from "./Components/Visibility";
import getUser from "./Tools/Client";
import useKeyPress from "./Tools/useKeyPress";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState("");
  const [elemRef, setElemRef] = useState({});
  const arrowLeft = useKeyPress("ArrowLeft");
  const arrowRight = useKeyPress("ArrowRight");
  const [selectedId, setSelectedId] = useState(null);

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

  const checkIndex = (id) => {
    if (id > Object.keys(data).length) return false;

    if (id < 0) return false;

    return true;
  };

  const focusItem = (type) => {
    if (!selectedId) {
      // console.log(data[0]);
      setSelectedId(data[0].id);
    } else {
      switch (type) {
        case "left":
          if (checkIndex(selectedId - 1)) {
            setSelectedId((prevValue) => prevValue - 1);
          }
          break;
        default:
          if (checkIndex(selectedId + 1)) {
            setSelectedId((prevValue) => prevValue + 1);
          }
          break;
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (arrowLeft) {
      focusItem("left");
    }
  }, [arrowLeft]);

  useEffect(() => {
    if (arrowRight) {
      focusItem("right");
    }
  }, [arrowRight]);

  useEffect(() => {
    if (selectedId) {
      elemRef[selectedId].current.focus();
    }
  }, [selectedId]);

  const refsById = useMemo(() => {
    const refs = {};
    if (data) {
      data.forEach((item) => {
        refs[item.id] = createRef(null);
      });
    }
    setElemRef(refs);
    return refs;
  }, [data]);

  return (
    <div>
      <Visibility elem={elemRef} />
      <Topbar onSearch={searchUser} />
      <Alert message={alert} state={alert} />
      <Alert state={loading} message="Loading..." />
      <UserLists state={data} elemRef={refsById} />
    </div>
  );
}
