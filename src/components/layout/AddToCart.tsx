import { useAppSelector } from "@/stores/hooks";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";

const AddToCart = () => {
    const carts = useAppSelector((state) => state.cart.items);

    const cartMount = carts.length;

    return (
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="shopping cart"
            sx={{ display: "flex", position: "absolute", right: 20, top: 5 }}
            disabled={!!!cartMount}
        >
            <Link href="/order/confirm-order" style={{ color: "inherit" }}>
                {!!cartMount && (
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
                            top: 0,
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                            {cartMount}
                        </Typography>
                    </Box>
                )}
                <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
            </Link>
        </IconButton>
    );
};

export default AddToCart;
