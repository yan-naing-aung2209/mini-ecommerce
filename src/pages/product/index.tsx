import SearchAppBar from "@/components/layout/SearchAppBar";
import ProductCard from "@/components/product/ProductCard";
import { Box } from "@mui/material";
import { useState } from "react";
import { Product } from "../../../generated/prisma/client";

const index = () => {
    const [products, setProducts] = useState<Product[]>([]);

    return (
        <SearchAppBar isMainPage={true} setProducts={setProducts}>
            <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {products.map((product) => {
                    return <ProductCard product={product} key={product.id} />;
                })}
            </Box>
        </SearchAppBar>
    );
};

export default index;
