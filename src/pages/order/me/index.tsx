import SearchAppBar from "@/components/layout/SearchAppBar";
import Loading from "@/components/Loading";
import OrderCard from "@/components/order/OrderCard";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getOrders } from "@/stores/slices/orderSlice";
import { getProducts } from "@/stores/slices/productSlice";
import { Box } from "@mui/material";
import { useEffect } from "react";

export default function index() {
    const orders = useAppSelector((state) => state.order.items);
    const orderLines = useAppSelector((state) => state.orderLine.items);
    const products = useAppSelector((state) => state.product.items);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!orders.length) dispatch(getOrders());
    }, [orders.length]);

    useEffect(() => {
        if (!products.length) dispatch(getProducts());
    }, [products.length]);

    if (!orders.length) return <Loading />;

    return (
        <SearchAppBar>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                {!!products.length &&
                    orders.map((order) => {
                        const newOrderLines = orderLines.filter((ol) => ol.order_id === order.id);
                        const orderLineProducts = newOrderLines.flatMap((ol) => {
                            return products
                                .filter((p) => p.id === ol.product_id)
                                .map((p) => ({ ...p, qty: ol.qty }));
                        });

                        return <OrderCard order={order} products={orderLineProducts} key={order.id} />;
                    })}
            </Box>
        </SearchAppBar>
    );
}
