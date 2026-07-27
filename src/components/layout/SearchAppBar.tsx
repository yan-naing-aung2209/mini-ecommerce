import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getProducts } from "@/stores/slices/productSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { Product } from "../../../generated/prisma/client";
import AddToCart from "./AddToCart";
import SearchField from "./SearchField";

interface NavProps {
    children: ReactNode;
    isMainPage?: boolean | false;
    setProducts: Dispatch<SetStateAction<Product[]>>;
}

const SearchAppBar = ({ children, isMainPage, setProducts }: NavProps) => {
    const products = useAppSelector((state) => state.product.items);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ top: 0, left: 0, right: 0 }}>
                <Toolbar>
                    <Link href="/product" style={{ color: "inherit", textDecoration: "none" }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                        >
                            Mini Ecommerce
                        </Typography>
                    </Link>
                    {isMainPage && (
                        <Box sx={{ position: "absolute", left: "40%", color: "white" }}>
                            <SearchField products={products} setProducts={setProducts} />
                        </Box>
                    )}
                    <Box sx={{ display: "flex", position: "absolute", right: 20 }}>
                        <AddToCart />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ margin: 5 }}>{children}</Box>
        </Box>
    );
};

export default SearchAppBar;
