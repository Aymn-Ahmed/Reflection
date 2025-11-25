// hooks/useUserReflections.js
import { useState, useEffect } from "react";

const useUserReflections = (userId) => {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reflectionsData =
      JSON.parse(localStorage.getItem("reflections")) || [];
    const userSpecificReflections = reflectionsData.filter(
      (item) => item.userId === userId
    );
    setReflections(userSpecificReflections);
    setLoading(false);
  }, [userId]);

  const deleteReflection = (id) => {
    const updated = reflections.filter((r) => r.id !== id);
    setReflections(updated);

    const allReflections =
      JSON.parse(localStorage.getItem("reflections")) || [];
    const filtered = allReflections.filter((r) => r.id !== id);
    localStorage.setItem("reflections", JSON.stringify(filtered));
  };

  return { reflections, loading, deleteReflection };
};

export default useUserReflections;
