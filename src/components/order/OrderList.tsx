import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(title: string, price: number, Qty: number, total: number) {
    return { title, price, Qty, total };
}

const rows = [
    createData("Product 1", 110, 6, 660),
    createData("Product 2", 55, 2, 110),
    createData("Product 3", 20, 3, 60),
];

const OrderList = () => {
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
                    {rows.map((row) => (
                        <TableRow key={row.title}>
                            <TableCell>{row.title}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.Qty}</TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow sx={{ bgcolor: "gray" }}>
                        <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Total</TableCell>
                        <TableCell
                            colSpan={3}
                            align="right"
                            sx={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                        >
                            830
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderList;
