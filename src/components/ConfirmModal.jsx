export default function ConfirmModal({ title = "Confirm", message = "Are you sure?", onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

      <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-md transform transition-all duration-200 scale-100">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-700">{message}</p>
        </div>

        <div className="p-4 flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded border hover:bg-gray-100">{cancelText}</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
