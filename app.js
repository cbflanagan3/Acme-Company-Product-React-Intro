const root = document.querySelector('#root');

const ProductList = ({ products }) => {
    const lis = products.map (product => React.createElement('li', { key: product.id }, product.name));
    return React.createElement('ul', null, lis);
}

const CompanyList = ({ companies }) => {
    const lis = companies.map( company => React.createElement('li', {key: company.id }, company.name));
    return React.createElement('ul', null, lis);
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            companies: [],   
        };
    }
   
    componentDidMount() {
        Promise.all([
            axios.get('https://acme-users-api-rev.herokuapp.com/api/products'),
            axios.get('https://acme-users-api-rev.herokuapp.com/api/companies')
          ])
          .then( responses => responses.map(response => response.data))
          .then(([products, companies])=> {
            this.setState({ products, companies });
          });
        }
    

    render () {
        const { products, companies } = this.state;
        return React.createElement('div', null, [
            React.createElement(ProductList, { products }),
            React.createElement(CompanyList, { companies })
        ]);
}
}


ReactDOM.render(React.createElement(App), root);
