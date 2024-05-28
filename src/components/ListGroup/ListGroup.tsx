import { useState } from "react";
import styles from "./ListGroup.module.css";

export interface ListItem {
  id: number;
  name: string;
}

interface Props {
  title?: string;
  items: ListItem[];
  onSelectItem: (item: ListItem) => void;
}

function ListGroup({ title, items = [], onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{title}</h1>
      {items.length === 0 && <p>No Items Found</p>}
      <ul className={[styles.listGroup, styles.container].join(" ")}>
        {items.map((item, index) => (
          <li
            key={item.id}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
