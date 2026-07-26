import SearchAppBar from "@/components/layout/SearchAppBar";
import Loading from "@/components/Loading";
import ProductCard from "@/components/product/ProductCard";
import { useAppSelector } from "@/stores/hooks";
import { Box } from "@mui/material";
import { useState } from "react";
import { Product } from "../../../generated/prisma/client";

const index = () => {
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
    const products = useAppSelector((state) => state.product.items);
    const viewProducts = searchedProducts.length ? searchedProducts : products;

    if (!viewProducts.length) return <Loading />;

    return (
        <SearchAppBar isMainPage={true} setSearchedProducts={setSearchedProducts}>
            <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {viewProducts.map((product) => {
                    return <ProductCard product={product} key={product.id} />;
                })}
            </Box>
        </SearchAppBar>
    );
};

export default index;
