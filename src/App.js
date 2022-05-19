import { Route, Routes, Router } from 'react-router-dom';
import './App.css';
import { CategoryPage } from './routes/category-page/category-page.component';
import { Navigation } from './routes/navigation/navigation.component';

function App() {
    return (
        <Routes>
            <Route path='/' element={ <Navigation /> }>
                <Route index element={ <CategoryPage /> } />
            </Route>
        </Routes>            
    );
}

export default App;
