import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import { Product } from "../../../generated/prisma/client";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link
            href={`/product/${product.id}`}
            style={{ color: "inherit", textDecoration: "none", display: "flex", gap: 3 }}
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea sx={{ width: 250 }}>
                    <CardMedia
                        component="img"
                        height="150"
                        image={product.imageUrl ? product.imageUrl : ""}
                        alt="food image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {product.title}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            component="div"
                            sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                            <MonetizationOnIcon sx={{ color: "green" }} />
                            <span>{product.price}</span>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
};

export default ProductCard;
