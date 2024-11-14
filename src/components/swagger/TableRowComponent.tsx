import { PencilIcon, TrashIcon } from "lucide-react";
import useDialog from "../../hooks/useDialog";
import { ConfirmationDialog } from "../Dialog";

const TableRowComponent = ({
  handleEditRequest,
  handleRemoveRequest,
  requests,
  columns,
}: any) => {
  const { isDialogVisible, showDialog, hideDialog, dialogConfig } = useDialog();

  const handleDeleteDialog = (index: any) => {
    showDialog({
      title: "Delete Request",
      message: "Are you sure you want to delete this request?",
      confirmText: "Delete",
      color: "red",
      onConfirm: () => {
        handleRemoveRequest(index);
        hideDialog();
      },
      onCancel: hideDialog,
    });
  };

  return (
    <>
      <table className="w-full bg-white rounded-lg">
        <tbody className="text-gray-700 text-base outline-none">
          {requests.map((item: any, index: any) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="p-4 text-start">{index + 1}</td>
              {columns.map((col: any) => (
                <td key={col.accessor} className={`p-4 text-${col.align}`}>
                  {col.render ? col.render(item) : item[col.accessor]}
                </td>
              ))}
              <td className="py-2 text-end pr-1">
                <div className="flex justify-end space-x-1">
                  <button
                    className={`p-2 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 transition duration-200 ease-in-out flex items-center justify-center`}
                    onClick={() => handleEditRequest(index, requests[index])}
                  >
                    <PencilIcon size={16} />
                  </button>
                  <button
                    className={`p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 transition duration-200 ease-in-out flex items-center justify-center`}
                    onClick={() => handleDeleteDialog(index)}
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationDialog
        isVisible={isDialogVisible}
        title={dialogConfig.title}
        message={dialogConfig.message}
        onConfirm={dialogConfig.onConfirm}
        onCancel={dialogConfig.onCancel}
        confirmText={dialogConfig.confirmText}
        color={dialogConfig.color}
      />
    </>
  );
};

export default TableRowComponent;
