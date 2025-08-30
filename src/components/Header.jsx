import Counter from './Counter';
import Logo from './Logo';
import { useItemsContext } from '../lib/hooks';

export default function Header() {
  const { items } = useItemsContext();

  return (
    <header>
      <Logo />
      <Counter
        itemsCompleted={items.filter((item) => item.completed).length}
        itemsTotal={items.length}
      />
    </header>
  );
}
