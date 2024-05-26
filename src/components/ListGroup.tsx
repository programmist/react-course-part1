import { useState } from "react";

interface ListItem {
  id: number;
  name: string;
}

interface Props {
  title?: string;
  items: ListItem[];
}

function ListGroup({ title, items = [] }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{title}</h1>
      {items.length === 0 && <p>No Items Found</p>}
      <ul className="list-group">
        {items.map(({ id, name }, index) => (
          <li
            key={id}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => setSelectedIndex(index)}
          >
            {name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
