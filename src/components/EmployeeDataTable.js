import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

import sortIcon from "../assets/images/icon.svg";

import "./EmployeeDataTable.css";

// Define columns name and displaying value in specific column row for Data table
const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => (
      <img src={row.image} alt="profile" height="30" width="30" />
    ),
  },
  {
    name: "Full Name",
    selector: (row) => `${row.firstName} ${row.maidenName} ${row.lastName}`,
    sortable: true,
  },
  {
    name: "Age",
    selector: (row) => row.age,
    sortable: true,
  },
  {
    name: "Demography",
    selector: (row) => {
      if (row.gender === "female") {
        return `F/${row.age}`;
      } else {
        return `M/${row.age}`;
      }
    },
  },
  {
    name: "Designation",
    selector: (row) => row.company.title,
  },
  {
    name: "Location",
    selector: (row) => `${row.address.state}, ${row.address.country}`,
  },
];

// adding custom style for data table header
const tableHeadersStyle = {
  headCells: {
    style: {
      fontSize: "15px",
      fontWeight: "600",
    },
  },
};

const EmployeeDataTable = () => {
  const [data, setData] = useState([]); // hold the employee api data
  const [filterData, setFilterData] = useState([]); // hold the filter data with updating function for filter state
  const [country, setCountry] = useState(""); //hold and updating the country filter value
  const [gender, setGender] = useState(""); //hold and updating the gender filter value
  const [countryData, setCountryData] = useState([]); //hold unique country
  const [genderData, setGenderData] = useState([]); //hold unique gender

  const baseUrl = "https://dummyjson.com"; // baseurl api for employee data

  useEffect(() => {
    axios
      .get(`${baseUrl}/users`)
      .then((res) => setData(res.data.users)) //fetching data from url and set to the data state with the help of axios library
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let filterEmployeeData = data; //filter variable with assign data state value

    if (country) {
      filterEmployeeData = data.filter(
        (employee) => employee.address.country === country //return array of object filtered employee data with its country
      );
    }
    if (gender) {
      filterEmployeeData = data.filter(
        (employee) => employee.gender === gender //return array of object filter male or female employee data
      );
    }
    setFilterData(filterEmployeeData); // update filter data into filterData state

    setCountryData([
      ...new Set(data.map((employee) => employee.address.country)), //getting unique countries from data and set to the countryData  state
    ]);
    setGenderData([...new Set(data.map((employee) => employee.gender))]); //getting unique genders from data and set to the genderData state
  }, [country, gender, data]);

  // Country Filter Function
  const countryFilter = (e) => {
    const selectedValue = e.target.value; // selected value from filter country box
    if (selectedValue === "country") {
      setFilterData(data);
    } else {
      setCountry(selectedValue); //update value into the country state
    }
  };

  // Gender filter Function
  const genderFilter = (e) => {
    const selectedValue = e.target.value; // selected value from filter gender box
    if (selectedValue === "gender") {
      setFilterData(data);
    } else {
      setGender(selectedValue); // update value into the gender state
    }
  };

  return (
    <>
      {/* wrapper for data table */}
      <main>
        {/* wrapper for a filter boxes */}
        <div className="filter_container">
          <div>
            <h3>Employees</h3>
          </div>
          <div className="filter_select_box">
            <div className="funnel_icon">
              {/* used font-awesome icons */}
              <span className="fa-solid fa-filter"></span>
            </div>
            <div>
              {/* used bootstrap class for select box */}
              <select className="form-select" onChange={countryFilter}>
                <option value="country">Country</option>
                {countryData.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {/* used bootstrap class for select box */}
              <select className="form-select" onChange={genderFilter}>
                <option value="gender">Gender</option>
                {genderData.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* wrapper for a table */}
        <div className="table_container">
          {/* Data table Component for displaying Employee data */}
          <DataTable
            columns={columns} //Defines columns and row values for a data table
            data={filterData} // passing filter data to the component
            customStyles={tableHeadersStyle} // adding a custom style to the table header
            pagination // pagination for table
            paginationRowsPerPageOptions={[10]} // row per page
            sortIcon={<img src={sortIcon} width="30" height="30" />} // adding custom sort icon image to the table sorting fields for header cells
          />
        </div>
      </main>
    </>
  );
};

export default EmployeeDataTable;
