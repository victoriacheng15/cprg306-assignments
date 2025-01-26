import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="w-11/12 mx-auto">
      <h2 className="text-3xl font-bold m-2">Shopping List</h2>
      <ItemList />
    </main>
  );
}
