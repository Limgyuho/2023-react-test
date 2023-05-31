import ProductListItem from "./ProductListItem";

export default function ProdList({ className }) {
  return (
    <>
      <div className={className}>
        <ul className="grid grid-cols-1 gap-[20px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <li>
            <ProductListItem imgNo={1} name="PRODUCT 1" price={"100,000"} />
          </li>
          <li>
            <ProductListItem imgNo={2} name="PRODUCT 2" price={"200,000"} />
          </li>
          <li>
            <ProductListItem imgNo={3} name="PRODUCT 3" price={"300,000"} />
          </li>
          <li>
            <ProductListItem imgNo={4} name="PRODUCT 4" price={"400,000"} />
          </li>
          <li>
            <ProductListItem imgNo={5} name="PRODUCT 5" price={"500,000"} />
          </li>
          <li>
            <ProductListItem imgNo={6} name="PRODUCT 6" price={"600,000"} />
          </li>
        </ul>
      </div>
    </>
  );
}
