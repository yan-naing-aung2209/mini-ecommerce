import Loading from "@/components/Loading";
import SearchAppBar from "@/components/layout/SearchAppBar";
import AppQuantityInput from "@/components/product/AppQuantityInput";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { addCart } from "@/stores/slices/cartSlice";
import { getProducts } from "@/stores/slices/productSlice";
import { CartItem } from "@/types/cart";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const index = () => {
    const router = useRouter();
    const productId = Number(router.query.id);
    const products = useAppSelector((state) => state.product.items);
    const dispatch = useAppDispatch();

    //cart
    const [cart, setCart] = useState<CartItem>();
    const [Qty, setQty] = useState<number>(1);

    const product = products.find((product) => product.id === productId);

    useEffect(() => {
        !products.length && dispatch(getProducts());
        if (!product) return;
        setCart((prevState) => (prevState ? { ...prevState, Qty } : { ...product, Qty }));
    }, [products.length, product, Qty]);

    const handleAddToCart = () => {
        !!cart && dispatch(addCart(cart));
        router.push("/product");
    };

    if (!productId) return <Loading />;

    return (
        <SearchAppBar>
            {product && (
                <Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Box sx={{ width: "40%" }}>
                            <img src={product.imageUrl || ""} alt="product image" style={{ width: 300 }} />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                                width: "60%",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h4">{product.title}</Typography>
                            <Typography variant="h6" sx={{ color: "gray" }}>
                                {product.description}
                            </Typography>
                            <Typography variant="h5" sx={{ color: "green" }}>
                                {product.price} Ks
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 3,
                            mt: 20,
                        }}
                    >
                        <Box>
                            <AppQuantityInput Qty={Qty} setQty={setQty} />
                        </Box>
                        <Box>
                            <Button variant="contained" onClick={handleAddToCart}>
                                Add To Cart
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </SearchAppBar>
    );
};

export default index;
