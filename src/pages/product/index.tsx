import SearchAppBar from "@/components/layout/SearchAppBar";
import Loading from "@/components/Loading";
import ProductCard from "@/components/product/ProductCard";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getProducts } from "@/stores/slices/productSlice";
import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "../../../generated/prisma/client";

const index = () => {
    const products = useAppSelector((state) => state.product.items);
    const dispatch = useAppDispatch();

    const [searchResults, setSearchResults] = useState<Product[]>(products);

    useEffect(() => {
        products.length > 0 ? setSearchResults(products) : dispatch(getProducts());
    }, [products.length]);

    console.log("rendered...");

    if (!products.length) return <Loading />;

    return (
        <SearchAppBar>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 5 }}>
                    <TextField
                        id="filter-product"
                        label="Search..."
                        variant="outlined"
                        sx={{ width: 400 }}
                        onChange={(evt) =>
                            setSearchResults(
                                products.filter((product) =>
                                    product.title.toLowerCase().includes(evt.target.value.toLowerCase()),
                                ),
                            )
                        }
                    />
                </Box>
                <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {!!searchResults.length ? (
                        searchResults.map((product) => <ProductCard product={product} key={product.id} />)
                    ) : (
                        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", color: "gray" }}>
                            <Typography variant="h5">No products found</Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </SearchAppBar>
    );
};

export default index;
