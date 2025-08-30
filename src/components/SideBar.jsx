import AddItemForm from './AddItemForm';
import ButtonGroup from './ButtonGroup';
import { useItemStore } from '../stores/itemsStore';

export default function SideBar() {
  const addItem = useItemStore((state) => state.addItem);

  return (
    <div className="sidebar">
      <AddItemForm onAddItem={addItem} />
      <ButtonGroup />
    </div>
  );
}
