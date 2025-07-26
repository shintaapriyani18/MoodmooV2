"use client";

type ModalProps = {
  title: string;
  onClose: () => void;
  onSave: () => void;
  name: string;
  price: number;
  desc: string;
  setName: (val: string) => void;
  setPrice: (val: number) => void;
  setDesc: (val: string) => void;
};

export default function Modal({
  title,
  onClose,
  onSave,
  name,
  price,
  desc,
  setName,
  setPrice,
  setDesc,
}: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-80">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-1 w-full mb-2"
        />
        <input
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          type="number"
          placeholder="Price"
          className="border p-1 w-full mb-2"
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="border p-1 w-full mb-2"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border px-2 py-1 rounded">
            Cancel
          </button>
          <button onClick={onSave} className="bg-pink-500 text-white px-2 py-1 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
