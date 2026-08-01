import { useAppSelector } from "@/stores/hooks";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const OrderList = () => {
    const carts = useAppSelector((state) => state.cart.items);

    const totalPrice = carts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price * currentValue.Qty,
        0,
    );

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                {/* <caption>total</caption> */}
                <TableHead>
                    <TableRow>
                        <TableCell component="th" sx={{ fontWeight: "bold", fontSize: 20 }}>
                            title
                        </TableCell>
                        <TableCell align="right" component="th" sx={{ fontWeight: "bold", fontSize: 20 }}>
                            price
                        </TableCell>
                        <TableCell align="right" component="th" sx={{ fontWeight: "bold", fontSize: 20 }}>
                            Qty
                        </TableCell>
                        <TableCell align="right" component="th" sx={{ fontWeight: "bold", fontSize: 20 }}>
                            total
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {carts.map((cart) => (
                        <TableRow key={cart.title}>
                            <TableCell>{cart.title}</TableCell>
                            <TableCell align="right">{cart.price}</TableCell>
                            <TableCell align="right">{cart.Qty}</TableCell>
                            <TableCell align="right">{cart.price * cart.Qty}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow sx={{ bgcolor: "gray" }}>
                        <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Total</TableCell>
                        <TableCell
                            colSpan={3}
                            align="right"
                            sx={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                        >
                            {totalPrice}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderList;
