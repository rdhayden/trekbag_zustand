import EmptyView from './EmptyView';
import Select from 'react-select';
import { use, useMemo, useState } from 'react';
import { useItemsContext } from '../lib/hooks';

const options = [
  { value: 'default', label: 'default' },
  { value: 'complete', label: 'complete' },
  { value: 'incomplete', label: 'incomplete' },
];

export default function ItemList() {
  const [sortBy, setSortBy] = useState('default');
  const { items, handleDeleteItem, handleToggleItem } = useItemsContext();

  // sort will sort an array in place and its bad practice to mutate the original array
  // so we will create a new array with the spread operator and sort it
  // sort takes a function that takes 2 arguments a and b, if the function returns a negative number
  // a will be sorted before b, if it returns a positive number b will be sorted before a
  // if it returns 0 a and b will be sorted in the same order
  // Also copying and sorting the array is expensive so we use memo to only run it when the items
  // and sortyBy change
  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === 'complete') {
          return b.completed - a.completed;
        }
        if (sortBy === 'incomplete') {
          return a.completed - b.completed;
        }
        return;
      }),
    [items, sortBy]
  );

  return (
    <ul className="item-list">
      {items.length === 0 && <EmptyView />}

      {items.length > 0 ? (
        <section className="sorting">
          <Select
            onChange={(option) => setSortBy(option.value)}
            defaultValue={options[0]}
            options={options}
          />
        </section>
      ) : null}

      {sortedItems.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          completed={item.completed}
          text={item.text}
          onDeleteItem={handleDeleteItem}
          onToggleItem={handleToggleItem}
        />
      ))}
    </ul>
  );
}

function Item({ id, completed, text, onDeleteItem, onToggleItem }) {
  return (
    <li className="item">
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleItem(id)}
        />
        {text}
      </label>
      <button
        onClick={() => {
          onDeleteItem(id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
