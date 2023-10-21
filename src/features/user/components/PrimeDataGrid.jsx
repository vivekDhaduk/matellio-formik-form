import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../index.css";

const PrimeDataGrid = ({ allUsers }) => {
  const getAddressString = (user) => {
    const addressFields = [
      "streetAddress",
      "city",
      "postalCode",
      "state",
      "country",
    ];
    const addressParts = addressFields
      .filter((field) => user[field])
      .map((field) => user[field]);

    return addressParts.join(", ");
  };

  const renderAddressField = (user) => {
    return getAddressString(user);
  };

  return (
    <div className="card">
      <DataTable
        value={allUsers}
        showGridlines
        removableSort
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          className="prime-data-column"
          field="firstName"
          header="First Name"
          sortable
          style={{
            width: "15%",
          }}
        ></Column>
        <Column
          field="lastName"
          className="prime-data-column"
          header="Last Name"
          sortable
          style={{ width: "15%" }}
        ></Column>
        <Column
          field="email"
          className="prime-data-column"
          header="Email"
          sortable
          style={{ width: "15%" }}
        ></Column>
        <Column
          field="dateOfBirth"
          className="prime-data-column"
          header="Date Of Birth"
          sortable
          style={{ width: "15%" }}
        ></Column>
        <Column
          field="phoneNumber"
          className="prime-data-column"
          header="Phone Number"
          sortable
          style={{ width: "15%" }}
        ></Column>
        <Column
          field={renderAddressField}
          header="Address"
          className="prime-data-column"
          sortable
          style={{ width: "25%" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default PrimeDataGrid;
