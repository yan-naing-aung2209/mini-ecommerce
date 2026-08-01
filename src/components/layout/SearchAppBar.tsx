import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ReactNode } from "react";
import AddToCart from "./AddToCart";

interface NavProps {
    children: ReactNode;
}

const SearchAppBar = ({ children }: NavProps) => {
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
                    <Box>
                        <AddToCart />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ margin: 5 }}>{children}</Box>
        </Box>
    );
};

export default SearchAppBar;
