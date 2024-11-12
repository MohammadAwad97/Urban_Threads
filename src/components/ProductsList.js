import Card from "./Card";

function ProductsList({ products }) {

    const renderedProducts = products.map((product) => {
        return <Card key={product.name} product={product}/>
    })


    return <div className="flex justify-start items-center flex-wrap gap-x-5 px-6 py-6">{renderedProducts}</div>
};

export default ProductsList;