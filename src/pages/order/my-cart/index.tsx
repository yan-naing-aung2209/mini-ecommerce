import SearchAppBar from "@/components/layout/SearchAppBar";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Status } from "../../../../generated/prisma/client";

export default function index() {
    const [status, setStatus] = useState<Status>("ORDERED");

    return (
        <SearchAppBar>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <Typography variant="h6">Status : </Typography>
                    <Typography variant="h6" sx={{ color: "green" }}>
                        {status}
                    </Typography>
                </Box>
                <Button variant="contained" sx={{ width: "fit-content" }}>
                    Cancel
                </Button>
            </Box>
        </SearchAppBar>
    );
}
