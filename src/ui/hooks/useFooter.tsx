import Link from "next/link";
import { useCallback } from "react";

export default function useFooter() {
  const renderList = useCallback(
    ({
      title,
      items,
    }: {
      title: string;
      items: { name: string; href: string }[];
    }) => (
      <div className="min-w-fit">
        <h3 className="font-semibold text-small text-default-600">{title}</h3>
        <ul className="mt-6 space-y-4">
          {items.map((item) => (
            <li key={item.name}>
              <Link className="text-default-400" href={item.href}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ),
    [],
  );

  return { renderList };
}
