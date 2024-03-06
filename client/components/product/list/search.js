import { useMemo, useState } from 'react'

export default function SearchProduct({product, setProduct}) {
  // const [searchProduct, setSearchProduct] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  const items = useMemo(() => {
    if (!product) return [];
    return product.data
  }, [product])

  // const handleSearch = () => {
  //   if (!product) return;
  //   const filteredProducts = product.data.filter((item) =>
  //     item.name.includes(searchProduct)
  //   );
  //   setSearchResults(filteredProducts);
  // };

  // const handleSearch = () => {
  //   console.log('click')
  //   if (searchProduct === '') {
  //    let setData = product.data;
  //   } else {
  //      const newData = product.data.filter((item) =>
  //       item.name.includes(searchProduct) ||
  //       item.color.includes(searchProduct) ||
  //       item.size.includes(searchProduct)
  //     );
  //     console.log(newData);
  //     return setData(newData);
  //   }
  // };

  return (
    <div 
    className="pe-1 my-3">
      <form 
      className="d-flex" 
      role="search"
 
      >
      <div className="input-group position-relative d-inline-flex align-items-center">
          <input
            type="text"
            className="form-control border-end"
            placeholder="搜尋商品"
            aria-label="from"
            aria-describedby="from"
        
            style={{
              borderRadius: 2.8,
            }}
          />
            <i
              className="bi bi-search position-absolute"
              role="presentation"
              style={{ right: 10, cursor: 'pointer', zIndex: 100 }}
            ></i>
        </div>
      </form>
    </div>
  )
}
