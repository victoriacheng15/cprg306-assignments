export default function Item({ name, quantity, category, onSelect, onDelete }) {
  return (
    <li className="p-2 m-4 w-[500px] bg-slate-900 max-w-sm hover:bg-slate-800 duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <div onClick={onSelect} className="cursor-pointer">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-sm">
            Buy {quantity} in {category}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="bg-red-500 px-2 py-1 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
