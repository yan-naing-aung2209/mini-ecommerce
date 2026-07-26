import SearchAppBar from "@/components/layout/SearchAppBar";
import { Box, Button, Typography } from "@mui/material";

export default function index() {
    return (
        <SearchAppBar>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <Box>
                    <Typography variant="h4">Ordered | Packed | Shipped | Delivered</Typography>
                </Box>
                <Button variant="contained" sx={{ width: "fit-content" }}>
                    Cancel
                </Button>
            </Box>
        </SearchAppBar>
    );
}
