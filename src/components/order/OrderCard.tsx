import { useAppDispatch } from "@/stores/hooks";
import { cancelOrder, removeOrder } from "@/stores/slices/orderSlice";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Order, Product } from "../../../generated/prisma/client";

interface OrderLineProduct extends Product {
    qty: number;
}

interface Props {
    order: Order;
    products: OrderLineProduct[];
}

const OrderCard = ({ order, products }: Props) => {
    const dispatch = useAppDispatch();

    const handleCancelOrder = () => {
        dispatch(cancelOrder(order.id));
        dispatch(removeOrder(order.id));
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 800, padding: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" sx={{ color: "gray", fontWeight: "bold" }}>
                    order id : {order.id}
                </Typography>
                <Typography sx={{ color: "green", fontWeight: "bold" }}>{order.status}</Typography>
            </Box>
            <hr />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2, mb: 2 }}>
                {products.map((product) => {
                    return (
                        <Box sx={{ display: "flex", gap: 10 }} key={product.id}>
                            <Box sx={{ width: 400 }}>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    {product.title}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                {product.qty}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                {product.price}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
            <hr />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button size="small" variant="contained" color="primary" onClick={handleCancelOrder}>
                    Cancel
                </Button>
                <Typography variant="h6">total : {order.total}</Typography>
            </Box>
        </Paper>
    );
};

export default OrderCard;
