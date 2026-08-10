import AppSnackBar from "@/components/AppSnackBar";
import SearchAppBar from "@/components/layout/SearchAppBar";
import Loading from "@/components/Loading";
import OrderList from "@/components/order/OrderList";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { resetCart } from "@/stores/slices/cartSlice";
import { createOrder } from "@/stores/slices/orderSlice";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function index() {
    const carts = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();

    const onSuccess = () => {
        setOpen(true);
    };

    const handleConfirmOrder = () => {
        dispatch(createOrder({ payload: carts, onSuccess }));
        setTimeout(() => {
            dispatch(resetCart([]));
            router.push("/product");
        }, 3000);
    };

    if (!carts.length) return <Loading />;

    return (
        <SearchAppBar>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <OrderList />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" sx={{ width: "fit-content" }} onClick={handleConfirmOrder}>
                        Confirm
                    </Button>
                </Box>
            </Box>
            <AppSnackBar open={open} onClose={() => setOpen(false)} msg="Add order successfully!" />
        </SearchAppBar>
    );
}
