import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import Link from "next/link";

const Profile = () => {
    return (
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="shopping cart"
            sx={{ display: "flex", position: "absolute", right: 20, top: 5 }}
        >
            <Link href="/order/me" style={{ color: "inherit" }}>
                <AccountCircleIcon sx={{ fontSize: 30 }} />
            </Link>
        </IconButton>
    );
};

export default Profile;
