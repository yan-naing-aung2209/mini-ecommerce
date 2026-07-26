import Loading from "@/components/Loading";
import SearchAppBar from "@/components/layout/SearchAppBar";
import AppQuantityInput from "@/components/product/AppQuantityInput";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getSingleProduct } from "@/stores/slices/productSlice";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

const index = () => {
    const router = useRouter();
    const productId = Number(router.query.id);
    const product = useAppSelector((state) => state.product.singleItem);
    const dispatch = useAppDispatch();

    useEffect(() => {
        productId && dispatch(getSingleProduct(productId));
    }, [productId]);

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
                            <AppQuantityInput />
                        </Box>
                        <Box>
                            <Button variant="contained">Add To Cart</Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </SearchAppBar>
    );
};

export default index;
