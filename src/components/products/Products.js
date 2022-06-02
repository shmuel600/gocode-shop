import '../products/Products.css';
import Product from '../product/Product'

const Products = ({ products }) => {
    return (
        <section className="products">
            {products.map((product) => {
                return (
                    <Product
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        category={product.category}
                        image={product.image}
                        ratingRate={product.rating.rate}
                        ratingCount={product.rating.count}
                    />
                )
            })
            }
        </section>
    );
}

export default Products;