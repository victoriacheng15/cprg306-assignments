import Link from "next/link";

export default function Home() {
  const weeks = ["week-2", "week-3", "week-4", "week-5"];

  return (
    <div className="max-w-3xl mx-auto py-24 px-10">
      <main className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">
          CPRG 306: Web Development 2 - Assignments
        </h1>
        <ul>
          {weeks.map((week) => (
            <li key={week}>
              <Link className="capitalize" href={`/${week}`}>
                {week.split("-").join(" ")} assignment
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
