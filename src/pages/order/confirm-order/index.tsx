import SearchAppBar from "@/components/layout/SearchAppBar";
import OrderList from "@/components/order/OrderList";
import { Box, Button } from "@mui/material";

export default function index() {
    return (
        <SearchAppBar>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <OrderList />
                <Button variant="contained" sx={{ width: "fit-content" }}>
                    Confirm
                </Button>
            </Box>
        </SearchAppBar>
    );
}
