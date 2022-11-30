import React from "react";
import ReactDOM from "react-dom/client";

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

class ProductList extends React.Component {
  render() {
    let product = this.props.product;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: "red" }}>{product.name}</span>
    );
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductCategory extends React.Component {
  render() {
    let product = this.props.product;
    return (
      <tr>
        <th colSpan="2">{product.category}</th>
      </tr>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleCheckedChanges = this.handleCheckedChanges.bind(this);
    this.handleFilterChanges = this.handleFilterChanges.bind(this);
  }
  handleCheckedChanges(e) {
    this.props.onCheckedChange(e.target.checked);
  }
  handleFilterChanges(e) {
    this.props.onFilterChange(e.target.value);
  }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterValue}
          onChange={this.handleFilterChanges}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleCheckedChanges}
          />{" "}
          Only show products in stock
        </p>
      </div>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    let tableData = [];
    let products = this.props.products;
    let inStockOnly = this.props.inStockOnly;
    let filterValue = this.props.filterValue;
    let prevCategory = "";
    for (let product of products) {
      if (
        product.name.toLowerCase().indexOf(filterValue.toLowerCase()) === -1
      ) {
        continue;
      }
      if (inStockOnly && !product.stocked) {
        continue;
      }
      if (product.category !== prevCategory) {
        tableData.push(
          <ProductCategory key={product.category} product={product} />
        );
      }
      tableData.push(<ProductList key={product.name} product={product} />);
      prevCategory = product.category;
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      </div>
    );
  }
}

class FilterableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: "",
      inStockOnly: false,
    };
    this.handleCheckedChange = this.handleCheckedChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  handleCheckedChange(value) {
    this.setState({ inStockOnly: value });
  }

  handleFilterChange(value) {
    this.setState({ filterValue: value });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterValue={this.state.filterValue}
          inStockOnly={this.state.inStockOnly}
          onCheckedChange={this.handleCheckedChange}
          onFilterChange={this.handleFilterChange}
        />
        <ProductTable
          products={PRODUCTS}
          inStockOnly={this.state.inStockOnly}
          filterValue={this.state.filterValue}
        />
      </div>
    );
  }
}

let root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<FilterableTable products={PRODUCTS} />);
