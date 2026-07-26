import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getProducts } from "@/stores/slices/productSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { Product } from "../../../generated/prisma/client";

interface NavProps {
    children: ReactNode;
    isMainPage?: boolean | false;
    setSearchedProducts?: (products: Product[]) => void;
}

const SearchAppBar = ({ children, isMainPage, setSearchedProducts }: NavProps) => {
    //for search feature
    const products = useAppSelector((state) => state.product.items);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    const handleSearchProduct = (title: string) => {
        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(title),
        );
        //@ts-ignore
        setSearchedProducts(filteredProducts);
    };
    //for search feature end

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
                            <TextField
                                sx={{
                                    "& .MuiFilledInput-root": {
                                        width: 300,
                                        // 1. Default bottom border color
                                        "&:before": {
                                            borderBottomWidth: "2px",
                                            borderBottomColor: "rgba(255, 255, 255, 0.5)",
                                        },
                                        // 2. Hover state bottom border color
                                        "&:hover:before": {
                                            // !important ensures hover overrides default
                                            borderBottomWidth: "2px",
                                            borderBottomColor: "#ffffff !important",
                                        },
                                        // 3. Focused state bottom border color (animated active line)
                                        "&:after": {
                                            borderBottomWidth: "2px",
                                            borderBottomColor: "#90caf9",
                                        },
                                        // 1. Force background to be transparent in all states
                                        backgroundColor: "transparent !important",
                                        "&:hover": {
                                            backgroundColor: "transparent !important",
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "transparent !important",
                                        },
                                        // 2. White text color
                                        color: "#ffffff",
                                    },
                                    //for input label
                                    // 1. Default (unfocused) label color
                                    "& .MuiInputLabel-root": {
                                        color: "rgba(255, 255, 255, 0.7)", // Or your choice: 'gray', '#aaa', etc.
                                    },
                                    // 2. Focused label color (when user clicks inside)
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#90caf9", // Active color
                                    },
                                }}
                                id="search_field"
                                label="search"
                                variant="filled"
                                onChange={(evt) => handleSearchProduct(evt.target.value)}
                            />
                        </Box>
                    )}

                    <Box sx={{ display: "flex", position: "absolute", right: 20 }}>
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
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ margin: 5 }}>{children}</Box>
        </Box>
    );
};

export default SearchAppBar;
