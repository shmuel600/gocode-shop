import Product from "../../components/Product/Product";
import { Box } from "@mui/system";

const Shop = ({ products }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '3% 9%', backgroundColor: 'transparent' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                {products.map((product) =>
                    <Product key={product._id} product={product} style={{ display: 'flex', flexWrap: 'wrap' }} />
                )}
            </Box>
        </Box>
    )
}

export default Shop;