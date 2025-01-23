import Link from "next/link";

export default function StudentInfo() {
  return (
    <div>
      <h1>Victoria Cheng</h1>
      <Link
        href="https://github.com/victoriacheng15/cprg306-assignments"
        className="hover:underline duration-300 ease-in-out"
      >
        https://github.com/victoriacheng15/cprg306-assignments
      </Link>
    </div>
  );
}
