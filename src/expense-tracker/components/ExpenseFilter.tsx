interface Props {
  categories: Array<string>;
  onSelectCategory: (category: string) => void;
}

function ExpenseFilter({ categories, onSelectCategory }: Props) {
  return (
    <select
      className="form-select"
      onChange={(e) => onSelectCategory(e.target.value)}
      defaultValue=""
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}

export default ExpenseFilter;
