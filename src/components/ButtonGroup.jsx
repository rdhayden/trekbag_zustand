import { useItemStore } from '../stores/itemsStore';
import Button from './Button';

export default function ButtonGroup() {
  // the advantage of zustand and redux over the react context api is that it provides selectors
  // that is, you can select specific pieces of state to listen to, rather than re-rendering
  // all components that use the store when any part of the state changes which is what happens
  // when you use useContext in a component
  const {
    markAllAsComplete,
    markAllAsIncomplete,
    resetToInitial,
    removeAllItems,
  } = useItemStore((state) => ({
    markAllAsComplete: state.markAllAsComplete,
    markAllAsIncomplete: state.markAllAsIncomplete,
    resetToInitial: state.resetToInitial,
    removeAllItems: state.removeAllItems,
  }));

  return (
    <section className="button-group">
      <Button onClick={markAllAsComplete} buttonType={'secondary'}>
        Mark all as complete
      </Button>
      <Button onClick={markAllAsIncomplete} buttonType={'secondary'}>
        Mark all as incomplete
      </Button>
      <Button onClick={resetToInitial} buttonType={'secondary'}>
        Reset to initial
      </Button>
      <Button onClick={removeAllItems} buttonType={'secondary'}>
        Remove all items
      </Button>
    </section>
  );
}
