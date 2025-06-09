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
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
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
            <tr key={idx} className="even:bg-gray-50 hover:bg-gray-100">
              <td className="border-t px-2 py-1">
                <input
                  value={item.category}
                  onChange={(e) => updateItem(idx, "category", e.target.value)}
                  className="w-full rounded border px-1 py-0.5 bg-transparent focus:border-blue-500 focus:ring-blue-500"
                />
              </td>
              <td className="border-t px-2 py-1">
                <input
                  value={item.description}
                  onChange={(e) => updateItem(idx, "description", e.target.value)}
                  className="w-full rounded border px-1 py-0.5 bg-transparent focus:border-blue-500 focus:ring-blue-500"
                />
              </td>
              <td className="border-t px-2 py-1 text-right">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(idx, "quantity", e.target.value)}
                  className="w-full rounded border px-1 py-0.5 bg-transparent text-right focus:border-blue-500 focus:ring-blue-500"
                />
              </td>
              <td className="border-t px-2 py-1">
                <input
                  value={item.unit}
                  onChange={(e) => updateItem(idx, "unit", e.target.value)}
                  className="w-full rounded border px-1 py-0.5 bg-transparent focus:border-blue-500 focus:ring-blue-500"
                />
              </td>
              <td className="border-t px-2 py-1 text-right">
                <input
                  type="number"
                  value={item.unitCost}
                  onChange={(e) => updateItem(idx, "unitCost", e.target.value)}
                  className="w-full rounded border px-1 py-0.5 bg-transparent text-right focus:border-blue-500 focus:ring-blue-500"
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
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Add Row
      </button>
    </div>
  );
}
