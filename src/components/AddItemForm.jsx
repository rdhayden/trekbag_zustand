import { useRef, useState } from 'react';
import Button from './Button';

export default function AddItemForm({ onAddItem }) {
  const [itemText, setItemText] = useState('');
  // useRef initially set to null if not given an initial value
  // useRef is like a box that can hold a mutable value in its .current property
  // it does not cause re-renders when its .current value changes and does not reset on re-renders
  // when passed to a JSX element, React will set current to the browsers DOM reference
  // to the rendered HTML element
  // React will also reset the .current value to null when the component unmounts
  // This makes it useful for setting focus on an input element which we'll do here
  const inputRef = useRef();

  // we are going to create a controlled component, which means the input value
  // in the JSX below is controlled by React state instead of letting the native DOM handle it
  // by explictly setting the value prop on the input element to itemText state we can perform
  // validation and reset the input field after submission
  // note that if we create an uncontrolled component that relies on the DOM to manage the
  // input value we would have to create a ref like we did below and then access the value
  // via inputRef.current.value
  const handleSubmit = (e) => {
    // preventDefault tells the user agent to not perform the default action
    // in the case of form submission, the default action is to reload the page and we don't want that
    e.preventDefault();
    // basic validation, if the itemText is empty, warn the user and return without adding an item
    if (itemText.trim() === '') {
      alert("Item can't be empty");
      setItemText('');
      // when the user clicks the button it removes the focus from the input field
      // we can use the ref set on the input below to set focus back to the input element
      inputRef.current.focus();
      return;
    }

    onAddItem(itemText.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add item</h2>
      <input
        // this is how we set the ref to the input element
        ref={inputRef}
        autoFocus
        value={itemText}
        onChange={(e) => {
          setItemText(e.target.value);
        }}
      />
      <Button>Add to list</Button>
    </form>
  );
}
