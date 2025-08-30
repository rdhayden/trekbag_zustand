import Counter from './Counter';
import Logo from './Logo';
import { useItemStore } from '../stores/itemsStore';

export default function Header() {
  const items = useItemStore((state) => state.items);

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
