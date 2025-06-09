import { useState } from "react";

export interface LineItem {
  category: string;
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
}

interface EstimateTableProps {
  initialItems?: LineItem[];
}

const emptyItem: LineItem = {
  category: "",
  description: "",
  quantity: 0,
  unit: "",
  unitCost: 0,
};

export default function EstimateTable({ initialItems = [] }: EstimateTableProps) {
  const [items, setItems] = useState<LineItem[]>(initialItems);

  const addRow = () => {
    setItems([...items, { ...emptyItem }]);
  };

  const updateItem = (
    index: number,
    field: keyof LineItem,
    value: string
  ) => {
    const updated = items.map((item, i) =>
      i === index
        ? {
            ...item,
            [field]:
              field === "quantity" || field === "unitCost"
                ? Number(value)
                : value,
          }
        : item
    );
    setItems(updated);
  };

  const calcTotal = (item: LineItem) => item.quantity * item.unitCost;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 text-left">Category</th>
            <th className="px-2 py-1 text-left">Description</th>
            <th className="px-2 py-1 text-right">Quantity</th>
            <th className="px-2 py-1 text-left">Unit</th>
            <th className="px-2 py-1 text-right">Unit Cost</th>
            <th className="px-2 py-1 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} className="even:bg-gray-50">
              <td className="border-t px-2 py-1">
                <input
                  value={item.category}
                  onChange={(e) => updateItem(idx, "category", e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </td>
              <td className="border-t px-2 py-1">
                <input
                  value={item.description}
                  onChange={(e) => updateItem(idx, "description", e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </td>
              <td className="border-t px-2 py-1 text-right">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(idx, "quantity", e.target.value)}
                  className="w-full bg-transparent outline-none text-right"
                />
              </td>
              <td className="border-t px-2 py-1">
                <input
                  value={item.unit}
                  onChange={(e) => updateItem(idx, "unit", e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </td>
              <td className="border-t px-2 py-1 text-right">
                <input
                  type="number"
                  value={item.unitCost}
                  onChange={(e) => updateItem(idx, "unitCost", e.target.value)}
                  className="w-full bg-transparent outline-none text-right"
                />
              </td>
              <td className="border-t px-2 py-1 text-right">
                {calcTotal(item).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="mt-2 rounded bg-blue-600 px-3 py-1 text-white"
      >
        Add Row
      </button>
    </div>
  );
}
