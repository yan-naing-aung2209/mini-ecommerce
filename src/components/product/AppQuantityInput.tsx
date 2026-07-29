import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  Qty: number;
  setQty: Dispatch<SetStateAction<number>>;
}

export default function AppQuantityInput({ Qty, setQty }: Props) {
  const [disable, setDisable] = useState<boolean>(false);

  useEffect(() => {
    Qty <= 1 ? setDisable(true) : setDisable(false);
  }, [Qty]);

  const handleDecreaseQty = () => {
    setQty((prevState) => prevState - 1);
  };
  const handleIncreaseQty = () => {
    setQty((prevState) => prevState + 1);
  };

  return (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
      <IconButton
        sx={{
          bgcolor: "blue",
          border: disable ? "2px solid gray" : "2px solid transparent",
          width: 25,
          height: 25,
          color: "white",
          "&:hover": { border: "2px solid blue", color: "black" },
        }}
        disabled={disable}
        onClick={handleDecreaseQty}
      >
        <RemoveIcon />
      </IconButton>
      <Box
        sx={{
          width: 70,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid blue",
          borderRadius: 3,
          userSelect: "none",
        }}
      >
        <Typography variant="h6">{Qty}</Typography>
      </Box>

      <IconButton
        sx={{
          bgcolor: "blue",
          border: "1px solid transparent",
          width: 25,
          height: 25,
          color: "white",
          "&:hover": { border: "2px solid blue", color: "black" },
        }}
        onClick={handleIncreaseQty}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}
