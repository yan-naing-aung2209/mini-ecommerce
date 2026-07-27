import { TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Product } from "../../../generated/prisma/client";

interface Props {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
}

const SearchField = ({ products, setProducts }: Props) => {
    useEffect(() => {
        if (products) {
            setProducts(products);
        }
    }, [products]);

    return (
        <TextField
            sx={{
                "& .MuiFilledInput-root": {
                    width: 300,
                    // 1. Default bottom border color
                    "&:before": {
                        borderBottomWidth: "2px",
                        borderBottomColor: "rgba(255, 255, 255, 0.5)",
                    },
                    // 2. Hover state bottom border color
                    "&:hover:before": {
                        // !important ensures hover overrides default
                        borderBottomWidth: "2px",
                        borderBottomColor: "#ffffff !important",
                    },
                    // 3. Focused state bottom border color (animated active line)
                    "&:after": {
                        borderBottomWidth: "2px",
                        borderBottomColor: "#90caf9",
                    },
                    // 1. Force background to be transparent in all states
                    backgroundColor: "transparent !important",
                    "&:hover": {
                        backgroundColor: "transparent !important",
                    },
                    "&.Mui-focused": {
                        backgroundColor: "transparent !important",
                    },
                    // 2. White text color
                    color: "#ffffff",
                },
                //for input label
                // 1. Default (unfocused) label color
                "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)", // Or your choice: 'gray', '#aaa', etc.
                },
                // 2. Focused label color (when user clicks inside)
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "#90caf9", // Active color
                },
            }}
            id="search_field"
            label="search"
            variant="filled"
            onChange={(evt) => {
                setProducts(
                    products.filter((product) => product.title.toLowerCase().includes(evt.target.value)),
                );
            }}
        />
    );
};

export default SearchField;
