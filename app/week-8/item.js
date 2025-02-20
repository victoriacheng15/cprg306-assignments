export default function Item({ name, quantity, category, onSelect }) {
  return (
    <li
      onClick={onSelect}
      className="p-2 m-4 w-[500px] bg-slate-900 max-w-sm cursor-pointer hover:bg-orange-800 duration-300 ease-in-out"
    >
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-sm">
        Buy {quantity} in {category}
      </p>
    </li>
  );
}
