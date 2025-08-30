export default function Counter({ itemsCompleted, itemsTotal }) {
  return (
    <p>
      <b>{itemsCompleted}</b>/{itemsTotal} items packed
    </p>
  );
}
