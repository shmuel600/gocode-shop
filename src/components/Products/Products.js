import Product from '../Product/Product';
import './Products.css';

const Products = ({ products }) => {
    return (
        <div className='products products-container'>
            {products.map((product) => {
                if (isNaN(product.amount)) {
                    product.amount = 1;
                }
                return (
                    <Product
                        product={product}
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        category={product.category}
                        image={product.image}
                        ratingRate={product.rating.rate}
                        ratingCount={product.rating.count}
                        amount={product.amount}
                    />
                )
            })}
        </div>
    );
}

export default Products;
