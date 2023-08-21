import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AddFeatureSet from "./AddFeatureSet";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import EditFeatureset from "./EditFeatureset";
import { useContext } from "react";
import { AppContext } from "context/AppContext";
import AssignCustomer from "./AssignCustomer";
import UnAssignCustomer from "./UnAssignCustomer";
import { Toast } from "primereact/toast";

const FeatureList = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isDialogVisible1, setIsDialogVisible1] = useState(false);
  const [isDialogVisible2, setIsDialogVisible2] = useState(false);
  const [isDialogVisible3, setIsDialogVisible3] = useState(false);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [myData, setMyData] = useState();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [data, setData] = useState([]);
  const toastRef = useRef(null);
  const toastErr = useRef(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const { updateData, resetState } = useContext(AppContext);

  //get list of featureset
  useEffect(() => {
    getListData();
    console.log(updateData);
  }, [updateData]);

  const getListData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/featureset/featureset-list`)
      .then((res) => {
        const formattedData = res.data.map((item, index) => ({
          ...item,
          serialNo: index + 1,
        }));
        setData(formattedData);
      })
      .catch((err) => console.log(err));
  };

  //opens delete dialog
  const openDeleteDialog = (rowData) => {
    setSelectedFeature(rowData);
    setIsDeleteDialogVisible(true);
  };

  //closes delete dialog
  const closeDeleteDialog = () => {
    setSelectedFeature(null);
    setIsDeleteDialogVisible(false);
  };

  //delete api call
  const handleDeleteConfirmation = async () => {
    if (selectedFeature) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/featureset/featureset-delete/${selectedFeature?.featureSetId}`
        );
        const { featureSetName } = response.data;
        console.log("Delete success:", response.data);

        getListData(); // Fetch the updated list of featuresets after the delete operation

        closeDeleteDialog();

        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: `Feature set '${featureSetName}' deleted successfully`,
          life: 3000,
        });
      } catch (error) {
        console.error("Error during delete:", error);

        closeDeleteDialog();

        if (error.response) {
          // Server responded with a status code other than 2xx
          toastErr.current.show({
            severity: "danger",
            summary: "Error",
            detail: error.response.data.message || "An error occurred",
            life: 3000,
          });
        } else if (error.request) {
          // The request was made but no response was received
          toastErr.current.show({
            severity: "danger",
            summary: "Error",
            detail: "No response received from the server",
            life: 3000,
          });
        } else {
          // Something happened in setting up the request
          toastErr.current.show({
            severity: "danger",
            summary: "Error",
            detail: "Error while deleting feature set",
            life: 3000,
          });
        }
      }
    }
  };

  //add FS success toast
  const handleAddSuccess = () => {
    setIsDialogVisible(false);
    toastRef.current.show({
      severity: "success",
      summary: "Success",
      detail: "Feature Set Added successfully",
      life: 3000,
    });
  };
  //assign FS success toast
  const handleAssignSuccess = () => {
    setIsDialogVisible2(false);
    toastRef.current.show({
      severity: "success",
      summary: "Success",
      detail: "Feature Set Assigned successfully",
      life: 3000,
    });
  };
  //unassign FS success toast
  const handleUnAssignSuccess = () => {
    setIsDialogVisible3(false);
    toastRef.current.show({
      severity: "success",
      summary: "Success",
      detail: "Feature Set unassigned successfully",
      life: 3000,
    });
  };
  //edit FS success toast
  const handleEditSuccess = () => {
    setIsDialogVisible1(false);
    toastRef.current.show({
      severity: "success",
      summary: "Success",
      detail: "Feature Set updated successfully",
      life: 3000,
    });
  };
  //open add dialog
  const openDialog = () => {
    setIsDialogVisible(true);
  };
  //closes add dialog
  const closeDialog = () => {
    setIsDialogVisible(false);
    resetState();
  };
  //opens edit dialog
  const openDialog1 = (rowData) => {
    setMyData(rowData); // Set the rowData to myData state
    setIsDialogVisible1(true);
  };
  //closes edit dialog
  const closeDialog1 = () => {
    setIsDialogVisible1(false);
    resetState();
  };
  //open assign dialog
  const openDialog2 = (rowData) => {
    setMyData(rowData);
    setIsDialogVisible2(true);
  };
  //closes assign dialog
  const closeDialog2 = () => {
    setIsDialogVisible2(false);
    resetState();
  };
  //opens unassign dialog
  const openDialog3 = (rowData) => {
    setMyData(rowData);
    setIsDialogVisible3(true);
  };
  //closes unassign dialog
  const closeDialog3 = () => {
    setIsDialogVisible3(false);
    resetState();
  };

  //global search dialog
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const clearSearch = () => {
    setGlobalFilterValue("");
    const _filters = { ...filters };
    _filters["global"].value = null;
    setFilters(_filters);
  };

  //searchbox
  const header = (
    <div className="align-items-center flex flex-wrap justify-end gap-2 py-3 dark:bg-gray-950">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
          className="searchbox w-[25vw] cursor-pointer rounded-full dark:bg-gray-950 dark:text-gray-50"
        />
        {globalFilterValue && (
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-text hover:none dark:text-gray-100"
            onClick={clearSearch}
          />
        )}
      </span>
    </div>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-file"
          rounded
          outlined
          style={{ width: "2rem", height: "2rem", marginRight: "5px" }}
          onClick={() => openDialog2(rowData)}
        />
        <Button
          icon="pi pi-file-excel
"
          rounded
          outlined
          style={{ width: "2rem", height: "2rem", marginRight: "5px" }}
          onClick={() => openDialog3(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          style={{ width: "2rem", height: "2rem", marginRight: "5px" }}
          onClick={() => openDialog1(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          style={{ width: "2rem", height: "2rem" }}
          severity="danger"
          onClick={() => openDeleteDialog(rowData)}
        />
      </React.Fragment>
    );
  };
  return (
    <>
      <div>
        <Button
          label="New Feature Set"
          icon="pi pi-plus"
          severity="Primary"
          className="mt-2 h-10 px-3 py-0 text-left dark:hover:text-white"
          onClick={openDialog}
        />
      </div>
      {/* assign dialog  */}
      <Dialog
        visible={isDialogVisible2}
        onHide={closeDialog2}
        style={{ width: "37vw" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Assign Feature-Set to Client Company"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <AssignCustomer
          parameters={{ propValue: myData?.featureSetId }}
          onSuccess={handleAssignSuccess}
        />
      </Dialog>
      {/* unassign dialog */}
      <Dialog
        visible={isDialogVisible3}
        onHide={closeDialog3}
        style={{ width: "37vw" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Unassign Client Company from Feature-Set"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <UnAssignCustomer
          parameters={{ propValue: myData?.featureSetId }}
          onSuccess={handleUnAssignSuccess}
        />
      </Dialog>
      {/* edit dialog */}
      <Dialog
        visible={isDialogVisible1}
        onHide={closeDialog1}
        style={{ width: "70vw" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Featureset Details"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <EditFeatureset
          parameters={{ propValue: myData?.featureSetId }}
          onSuccess={handleEditSuccess}
        />
      </Dialog>
      {/* add dialog */}
      <Dialog
        visible={isDialogVisible}
        onHide={closeDialog}
        style={{ width: "70vw" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Fill the details"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <AddFeatureSet onSuccess={handleAddSuccess} />
      </Dialog>

      <Toast ref={toastRef} className="toast-custom" position="top-right" />
      <Toast ref={toastErr} className="bg-red-400" />
      {/* delete dialog */}
      <Dialog
        visible={isDeleteDialogVisible}
        onHide={closeDeleteDialog}
        header="Confirm Delete"
        footer={
          <div>
            <Button
              label="Delete"
              icon="pi pi-times"
              className="p-button-danger px-3 py-2 hover:bg-none dark:hover:bg-gray-50"
              onClick={handleDeleteConfirmation}
            />
            <Button
              label="Cancel"
              icon="pi pi-check"
              className="p-button-secondary px-3 py-2 hover:bg-none dark:hover:bg-gray-50"
              onClick={closeDeleteDialog}
            />
          </div>
        }
      >
        <div>
          Are you sure you want to delete {selectedFeature?.featureSetName}?
        </div>
      </Dialog>
      {/* List View */}
      <DataTable
        removableSort
        value={data}
        dataKey="id"
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        filterDisplay="menu"
        filters={filters}
        globalFilterFields={["featureSetId", "featureSetName"]}
        emptyMessage="No customers found."
        header={header}
      >
        <Column
          field="serialNo"
          className="border-none dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "7rem", textAlign: "center" }}
        />
        <Column
          field="featureSetId"
          header="ID"
          style={{ minWidth: "16rem" }}
          className="border-none dark:bg-gray-900 dark:text-gray-200"
        />
        <Column
          field="featureSetName"
          header="Name"
          style={{ minWidth: "26rem" }}
          className="border-none dark:bg-gray-900 dark:text-gray-200"
        />
        <Column
          body={actionBodyTemplate}
          header="Action"
          className="dark:bg-gray-900 dark:text-gray-200"
          style={{ minWidth: "8rem" }}
        />
      </DataTable>
    </>
  );
};

export default FeatureList;
