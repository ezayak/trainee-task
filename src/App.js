import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CategoryPage } from './routes/category-page/category-page.component';
import { Navigation } from './routes/navigation/navigation.component';

function App() {
    return (
        <Router basename='/trainee-task'>
            <Routes>
                <Route path='/' element={ <Navigation /> }>
                    <Route index element={ <CategoryPage /> } />
                </Route>
            </Routes>            
        </Router>
    );
}

export default App;
