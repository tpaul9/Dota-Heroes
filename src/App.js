import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";
import Nav from "./Nav"

function App() {
  const [data, setData] = useState(null);

  React.useEffect(() => {
    fetch("https://api.opendota.com/api/constants/heroes")
      .then((res) => res.json())
      .then((data) => {
        data = Object.values(data)
        for (let i = 0; i < data.length; i++) {
          data[i].primary_attr = data[i].primary_attr === "str" ? "Strength" : data[i].primary_attr === "agi" ? "Agility" : data[i].primary_attr === "int" ? "Intelligence" : ""
          data[i].level1_armor = Math.round(10 * (data[i].base_armor + data[i].base_agi / 6)) / 10
          data[i].level1_attack_damage = Math.round((data[i].base_attack_min + data[i].base_attack_max) / 2 + (data[i].primary_attr === "Strength" ? data[i].base_str : data[i].primary_attr === "Agility" ? data[i].base_agi : data[i].primary_attr === "Intelligence" ? data[i].base_int : 0))
        }
        setData(data)

      });
  }, []);

  const columns = [
    {
      title: "Name",
      field: "localized_name",
      render: (rowData) => (<div>
        <img src={`images/${rowData.localized_name.split(" ").join("-").toLowerCase()}.png`} width="100px" height="auto" />
        <div>
          {rowData.localized_name}
        </div>
      </div>),
      grouping: false
    },
    {
      title: "Attack Type",
      field: "attack_type",
    },
    {
      title: "Primary Attribute",
      field: "primary_attr",
      render: (value, renderType) => (
        renderType === "group" ? (
          <div>
            <img src={`images/${value}.png`} />
            <div>{value}</div>
          </div>
        ) : (
          <div><img src={`images/${value.primary_attr}.png`} />
            <div>
              {value.primary_attr}</div>
          </div>)
      ),
    },
    {
      title: "Attack Range",
      field: "attack_range",
    },
    {
      title: "Base Attack Time",
      field: "attack_rate",
      tooltip: "The number of seconds to perform a single attack with 100 total attack speed (including base attack speed). All else equal, the lower the base attack time, the higher the attack speed."
    },
    {
      title: "Attribute Gain\nStr/Agi/Int",
      render: (rowData) => `${rowData.str_gain}/${rowData.agi_gain}/${rowData.int_gain}`,
      customSort: (a, b) => (a.str_gain + a.agi_gain + a.int_gain) - (b.str_gain + b.agi_gain + b.int_gain),
      grouping: false,
    },
    {
      title: "Armor",
      field: "level1_armor",
      tooltip: "Includes both base armor and armor from the hero's level 1 agility.",
      grouping: false,
    },
    {
      title: "Attack Damage",
      field: "level1_attack_damage",
      tooltip: "Includes both base attack damage and damage from the hero's level 1 primary attribute.",
      gropuing: false,
    },
    {
      title: "Base Health Regen",
      field: "base_health_regen",
    },
    {
      title: "Base Mana Regen",
      field: "base_mana_regen",
    },
  ];

  const options = {
    rowStyle: rowData => ({
      backgroundColor: rowData.primary_attr === "Strength" ? "#E27275" : rowData.primary_attr === "Agility" ? "#93F576" : rowData.primary_attr === "Intelligence" ? "#ACFBF7" : ""
    }),
    search: true,
    paging: false,
    filtering: true,
    exportButton: true,
    draggable: true,
    grouping: true,
  }

  return (
    <div className="app">
      <Nav />
      <div className="content">
        {data ? <MaterialTable icons={tableIcons} title="Heroes" data={data} columns={columns} options={options} /> : ""}
      </div>
    </div>
  );
}

export default App;
