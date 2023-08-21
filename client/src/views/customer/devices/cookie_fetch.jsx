import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const ProfileOverview = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = Cookies.get("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <div className="flex w-full flex-col gap-5">
      <h1>{userId}</h1>
    </div>
  );
};

export default ProfileOverview;
