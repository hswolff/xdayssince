import { Incident } from 'util/db';
import Link from 'next/link';

interface IncidentItemProps {
  item: Incident;
  allowDelete?: boolean;
  onDelete?: () => void;
}

export function IncidentItem({
  item,
  allowDelete = false,
  onDelete = () => {},
}: IncidentItemProps): JSX.Element {
  function onDeleteInternal(itemId: string) {
    try {
      fetch('/api/incident', {
        method: 'DELETE',
        body: itemId,
      });
    } catch (error) {
      console.log(error);
    }

    onDelete();
  }
  return (
    <li>
      <Link href={`/i/${item._id}`}>
        <a>{item.title}</a>
      </Link>
      {allowDelete && (
        <button
          onClick={() => onDeleteInternal(item._id.toString())}
          style={{ marginLeft: 10 }}
        >
          Delete
        </button>
      )}
    </li>
  );
}
