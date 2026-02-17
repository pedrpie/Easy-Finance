import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-[#303030] text-white flex justify-between items-center p-3">
      <h1 className="text-3xl font-bold">Easy Finance</h1>
      <nav className="flex gap-10">
        <Link href="" className="text-2xl">About</Link>
        <Link href="" className="text-2xl">Github</Link>
      </nav>
    </div>
  );
}
