import Background from './Background';
import Footer from './Footer';
import '../index.css';
import Header from './Header';
import ItemList from './ItemList';
import SideBar from './SideBar';

function App() {
  return (
    <>
      <Background />
      <main>
        <Header />
        <ItemList />
        <SideBar />
      </main>
      <Footer />
    </>
  );
}

export default App;
