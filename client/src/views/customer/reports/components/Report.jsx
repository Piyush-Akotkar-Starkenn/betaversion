import React, { useState, useEffect } from "react";
import logo from "../../../../assets/img/logo.png";
import { Fieldset } from "primereact/fieldset";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import { Button } from "primereact/button";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";

const Report = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const formattedDate = `${currentDate.getDate()}/ ${
    currentDate.getMonth() + 1
  }/ ${currentDate.getFullYear()}`;

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;

  const downloadPDF = () => {
    const content = document.getElementById("pdf-content");

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save(`report@${formattedDate}.pdf`);
    });
  };

  return (
    <>
      <div id="pdf-content">
        <div className="flex justify-between p-5">
          <img src={logo} className="w-[177px]" alt="" />
          <div className="flex flex-col">
            <span>Date: {formattedDate}</span>
            <span>Time: {formattedTime}</span>
          </div>
        </div>
        <div className="card p-8">
          <Fieldset legend="Summary" className="pl-6">
            <div className="relative overflow-x-auto">
              <table className="w-[50vw] text-left text-sm text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </th>
                    <td className="px-6 py-4">Driver/ Vehicle Summary</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Date Range
                    </th>
                    <td className="px-6 py-4">10/ 07/ 2023 TO 23/ 07/ 2023</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Vehicles / Drivers
                    </th>
                    <td className="px-6 py-4">
                      <ul>
                        <li>First Vehicle/ Driver</li>
                        <li>Second Vehicle/ Driver</li>
                        <li>Third Vehicle/ Driver</li>
                        <li>Fourth Vehicle/ Driver</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Fieldset>
        </div>
        <div className="card p-8">
          <Fieldset legend="Analytical Graph" className="pl-6">
            <div className="relative overflow-x-auto">
              <table className="w-[50vw] text-left text-sm text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      X-axis
                    </th>
                    <td className="px-6 py-4">Time (days/ hours)</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Y-axis
                    </th>
                    <td className="px-6 py-4">
                      <ul>
                        <li>Automatic Braking</li>
                        <li>Sudden Brake</li>
                        <li>Drowsiness</li>
                        <li>Distraction</li>
                        <li>No Driver</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between">
                <TotalSpent />
                <WeeklyRevenue />
              </div>
            </div>
          </Fieldset>
        </div>
      </div>
      <div className="text-center">
        <Button
          label="Download"
          icon="pi pi-cloud-download"
          severity="secondary"
          className="mx-2 my-3 h-10 px-2 py-0 text-left dark:hover:text-white"
          onClick={downloadPDF}
        />
        <Link to="/customer/reports">
          <Button
            label="Go Back"
            icon="pi pi-arrow-circle-left"
            severity="Primary"
            className="mx-2 my-3 h-10 px-3 py-0 text-left dark:hover:text-white"
          />
        </Link>
      </div>
    </>
  );
};

export default Report;
