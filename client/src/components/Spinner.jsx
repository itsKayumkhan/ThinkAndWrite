import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = ({ ok }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!ok) {
      const timeoutId = setTimeout(() => {
        navigate("/login");
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [ok, navigate]);

  return (
    <div className="flex items-center justify-center space-x-2 h-screen">
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400" />
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400" />
      <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400" />
    </div>
  );
};

export default Spinner;
