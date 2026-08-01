import SearchAppBar from "@/components/layout/SearchAppBar";
import Loading from "@/components/Loading";
import OrderList from "@/components/order/OrderList";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { resetCart } from "@/stores/slices/cartSlice";
import { createOrder } from "@/stores/slices/orderSlice";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function index() {
    const carts = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    const router = useRouter();

    const handleConfirmOrder = () => {
        dispatch(createOrder(carts));
        dispatch(resetCart([]));
        router.push("/product");
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
        </SearchAppBar>
    );
}
