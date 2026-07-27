import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, IconButton, Typography } from "@mui/material";

const AddToCart = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "red",
                    width: 17,
                    height: 17,
                    borderRadius: "50%",
                    textAlign: "center",
                    position: "absolute",
                    right: 0,
                }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    2
                </Typography>
            </Box>
            <IconButton size="large" edge="start" color="inherit" aria-label="shopping cart">
                <ShoppingCartOutlinedIcon />
            </IconButton>
        </>
    );
};

export default AddToCart;
