import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Navigator = ({ path = "/", text = "Home", className }) => {
  const navigate = useNavigate();

  const navigateTo = useCallback((path) => () => navigate(path), []);

  return (
    <span className={className} onClick={navigateTo(path)}>
      {text}
    </span>
  );
};

export default Navigator;
