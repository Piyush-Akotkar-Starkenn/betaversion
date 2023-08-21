import React, { useState } from "react";
import ReportsList from "./components/ReportsList";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Schedule from "./components/Schedule";
import Generate from "./components/Generate";

const Reports = () => {
  const [isGenerateDialogVisible, setIsGenerateDialogVisible] = useState(false);
  const [isScheduleDialogVisible, setIsScheduleDialogVisible] = useState(false);

  const openDialog1 = () => {
    setIsGenerateDialogVisible(true);
  };
  const closeDialog1 = () => {
    setIsGenerateDialogVisible(false);
  };
  const openDialog2 = () => {
    setIsScheduleDialogVisible(true);
  };
  const closeDialog2 = () => {
    setIsScheduleDialogVisible(false);
  };

  return (
    <div>
      <h4 className="text-dark text-xl font-bold dark:text-white">Reports</h4>
      <Button
        label="Generate"
        icon="pi pi-chart-line"
        severity="Primary"
        className="mt-2 h-10 px-3 py-0 text-left dark:hover:text-white"
        onClick={openDialog1}
      />
      <Button
        label="Schedule"
        icon="pi pi-calendar-plus"
        severity="Primary"
        className="mx-3 mt-2 h-10 px-3 py-0 text-left dark:hover:text-white"
        onClick={openDialog2}
      />
      <ReportsList />
      <Dialog
        visible={isGenerateDialogVisible}
        onHide={closeDialog1}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Fill the details"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <Generate />
      </Dialog>
      <Dialog
        visible={isScheduleDialogVisible}
        onHide={closeDialog2}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Fill the details"
        modal
        className="p-fluid dark:bg-gray-900"
      >
        <Schedule />
      </Dialog>
    </div>
  );
};

export default Reports;
