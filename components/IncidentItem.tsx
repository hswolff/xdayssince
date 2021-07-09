import { Incident } from 'util/db';
import Link from 'next/link';

export function IncidentItem({ item }: { item: Incident }): JSX.Element {
  return (
    <li key={item._id.toString()}>
      <Link href={`/i/${item._id}`}>
        <a>{item.title}</a>
      </Link>
    </li>
  );
}
