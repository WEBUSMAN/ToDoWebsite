import React, { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { styled } from "@mui/system";

const StyledAlert = styled(Alert)({
  borderRadius: 0,
  "& .MuiAlert-action": {
    alignItems: "center",
    display: "flex",
    padding: 4,
    visibility: "hidden",
  },
});

const AlertComp = ({ text }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {open && (
        <StyledAlert
          variant="filled"
          severity="success"
          onClose={() => setOpen(false)}
        >
          {text}
        </StyledAlert>
      )}
    </>
  );
};

export default AlertComp;
