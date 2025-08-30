import Background from './Background';
import Footer from './Footer';
import '../index.css';
import Header from './Header';
import ItemList from './ItemList';
import SideBar from './SideBar';
import ItemsContextProvider from '../contexts/ItemsContextProvider';

function App() {
  return (
    <>
      <Background />
      <main>
        <ItemsContextProvider>
          <Header />
          <ItemList />
          <SideBar />
        </ItemsContextProvider>
      </main>
      <Footer />
    </>
  );
}

export default App;
