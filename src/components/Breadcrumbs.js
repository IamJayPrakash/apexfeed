import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm breadcrumbs mb-4">
      <ol className="flex gap-2 text-muted-foreground">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:underline">{item.label}</Link>
            ) : (
              <span className="font-semibold text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
