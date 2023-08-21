import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataView } from "primereact/dataview";
import { Vehicles } from "../variables/Vehicles";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { GiMineTruck } from "react-icons/gi";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Checkbox } from "primereact/checkbox";

export default function VehiclesGrid() {
  let emptyProduct = {
    id: null,
    name: "",
    image: null,
    description: "",
    category: null,
    reg: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "ACTIVE",
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  // const [selectedProducts, setSelectedProducts] = useState(null);
  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [selectedEcu, setSelectedEcu] = useState(null);
  const ECU = [
    { name: "1", code: "one" },
    { name: "2", code: "two" },
    { name: "3", code: "three" },
  ];
  const [selectedStatus, setSelectedStatus] = useState(null);
  const status = [
    { name: "Active", code: "1" },
    { name: "Deactive", code: "2" },
  ];
  useEffect(() => {
    Vehicles.getProducts().then((data) => setProducts(data));
  }, []);

  // const formatCurrency = (value) => {
  //   return value.toLocaleString("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //   });
  // };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };

      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = setProduct(product);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    setProducts([]);
    setDeleteProductsDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Add Vehicle"
          icon="pi pi-plus"
          severity="Primary"
          className="h-10 px-5 py-0"
          onClick={openNew}
        />

        <Button
          label="Delete All"
          icon="pi pi-trash"
          className="h-10 px-5 py-0"
          severity="danger"
          title="Select to delete"
          onClick={confirmDeleteSelected}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-download"
        className="h-10 border-none bg-gray-600 px-5 py-0"
        onClick={exportCSV}
      />
    );
  };

  // const imageBodyTemplate = (rowData) => {
  //   return (
  //     <img
  //       src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
  //       alt={rowData.image}
  //       className="shadow-2 border-round"
  //       style={{ width: "64px" }}
  //     />
  //   );
  // };

  // const priceBodyTemplate = (rowData) => {
  //   return formatCurrency(rowData.reg);
  // };

  // const ratingBodyTemplate = (rowData) => {
  //   return <Rating value={rowData.rating} readOnly cancel={false} />;
  // };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "ACTIVE":
        return "success";

      case "DEACTIVE":
        return "danger";

      default:
        return null;
    }
  };

  const header = (
    <div className="align-items-center flex flex-wrap justify-between gap-2 py-3 dark:bg-gray-950">
      {/* <h4 className="m-0">Manage Products</h4> */}
      <span>
        <Checkbox
          className="my-auto"
          onChange={(e) => setChecked(e.checked)}
          checked={checked}
        ></Checkbox>
        &nbsp;Select All
      </span>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="w-[25vw] rounded-full dark:bg-gray-900 dark:text-gray-50"
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        outlined
        className="h-9 px-2 py-0"
        style={{ backgroundColor: "transparent" }}
        onClick={hideDialog}
      />
      <Button
        label="Save"
        className="h-9 border-none px-2 py-0"
        style={{ backgroundColor: "#422AFB" }}
        icon="pi pi-check"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        outlined
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );
  const itemTemplate = (product) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="border-1 surface-border surface-card border-round h-[28vh] w-[27vw] rounded-lg bg-white p-4 px-5 dark:bg-gray-900 dark:text-gray-150">
          <div className="align-items-center flex flex-wrap justify-between gap-2">
            <div className="align-items-center flex gap-2">
              <Checkbox
                onChange={(e) => setChecked(e.checked)}
                checked={checked}
              ></Checkbox>
              <span className="font-semibold">{product.name}</span>
            </div>
            <Tag
              value={product.inventoryStatus}
              severity={getSeverity(product)}
            ></Tag>
          </div>
          <div className="flex-column align-items-center flex gap-6 py-1">
            <GiMineTruck
              className="text-red-450 dark:text-red-550"
              style={{
                fontSize: "4rem",
              }}
            />
            <div className="flex flex-col">
              <p>Registration No. : {product.id}</p>
              <p>ECU : {product.id}</p>
              <p>IoT : {product.id}</p>
              <p>DMS : {product.id}</p>
            </div>
          </div>
          <div className="align-items-center flex justify-start">
            <button
              className="mr-3 rounded-full bg-gray-400 p-2 text-gray-800"
              onClick={() => editProduct(product)}
            >
              <FiEdit2 />
            </button>
            <button
              className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
              severity="danger"
              onClick={() => confirmDeleteProduct(product)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="card rounded-lg bg-none dark:bg-gray-950">
        <Toolbar
          className="rounded-lg border-none dark:bg-gray-950"
          start={leftToolbarTemplate}
          end={rightToolbarTemplate}
        ></Toolbar>
      </div>

      <div className="card rounded-lg bg-none dark:bg-gray-950">
        <DataView
          value={products}
          globalFilter={globalFilter}
          header={header}
          itemTemplate={itemTemplate}
          paginator
          rows={6}
        />
      </div>
      {/* Add New Vehicle Form */}
      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name" className="mb-2 font-bold">
            Vehicle Name
          </label>
          <InputText
            id="name"
            value={product.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !product.name })}
            style={{ marginTop: "0.5rem" }}
          />
          {submitted && !product.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field mt-2">
          <label htmlFor="description" className="font-bold">
            Registration Number
          </label>
          <InputText
            id="description"
            className="mt-2"
            value={product.description}
            onChange={(e) => onInputChange(e, "description")}
            required
          />
        </div>

        <div className="field mt-2">
          <label htmlFor="" className="font-bold">
            Select ECU
          </label>
          <Dropdown
            value={selectedEcu}
            onChange={(e) => setSelectedEcu(e.value)}
            options={ECU}
            optionLabel="name"
            placeholder="Tap to select"
            className="md:w-14rem mt-2 w-full"
          />
        </div>

        <div className="field mt-2">
          <label htmlFor="" className="font-bold">
            Select IoT
          </label>
          <Dropdown
            value={selectedEcu}
            onChange={(e) => setSelectedEcu(e.value)}
            options={ECU}
            optionLabel="name"
            placeholder="Tap to select"
            className="md:w-14rem mt-2 w-full"
          />
        </div>

        <div className="field mt-2">
          <label htmlFor="" className="font-bold">
            Select DMS
          </label>
          <Dropdown
            value={selectedEcu}
            onChange={(e) => setSelectedEcu(e.value)}
            options={ECU}
            optionLabel="name"
            placeholder="Tap to select"
            className="md:w-14rem mt-2 w-full"
          />
        </div>

        <div className="field mt-2">
          <label htmlFor="" className="font-bold">
            Select Status
          </label>
          <Dropdown
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.value)}
            options={status}
            optionLabel="name"
            placeholder="Tap to select"
            className="md:w-14rem mt-2 w-full"
          />
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
