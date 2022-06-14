import './Products.css';
import Product from '../Product/Product'

const Products = ({ products }) => {
    return (
        <div>
            <section className="products">
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
            </section>
        </div>
    );
}

export default Products;
