import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto py-24 px-10">
      <main className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">
          CPRG 306: Web Development 2 - Assignments
        </h1>
        <ul>
          <li>
            <Link href="/week-2">Week 2 Assignment</Link>
          </li>
          <li>
            <Link href="/week-3">Week 3 Assignment</Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
