/* eslint-disable react/jsx-props-no-spreading */
import './App.css';
import { Route, Routes, useParams } from 'react-router-dom';
import CartPage from './routes/cart-page/cart-page.component';
import CategoryPage from './routes/category-page/category-page.component';
import Navigation from './routes/navigation/navigation.component';
import ProductDetailPage from './routes/product-detail-page/product-detail-page.component';

function WrapperPDP() {
    const params = useParams();
    return <ProductDetailPage {...params} />;
}

function WrapperCP() {
    const params = useParams();
    return <CategoryPage {...params} />;
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<CategoryPage />} />
                <Route path="/category/:name" element={<WrapperCP />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/pdp/:productId" element={<WrapperPDP />} />
            </Route>
        </Routes>
    );
}

export default App;
