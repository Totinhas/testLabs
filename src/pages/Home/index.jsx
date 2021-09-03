import React, { useState, useEffect } from "react";
import Select from "react-select";
import { LabItem } from "../../components";
import "./Home.css";
import { useHistory } from "react-router-dom";

const Home = ({ listOfLabs }) => {
  const history = useHistory();
  const basePath = "/"; // move this to an import
  const options = [
    { label: "by Tag", value: "tag" },
    { label: "by Title", value: "title" },
  ];
  // console.log('Home', listOfLabs);
  const [filteredListOfLabs, setFilteredListOfLabs] = useState(listOfLabs);
  const [searchType, setSearchType] = useState({
    label: "by Tag",
    value: "tag",
  });

  useEffect(() => {
    // console.log('Home', "useEffect", listOfLabs);
    setFilteredListOfLabs(listOfLabs)
  }, [listOfLabs]);

  const handleChange = (value) => {
    setSearchType(value);
  };

  const handleClickLabItem = (labId) => {
    history.push(basePath + "lab/" + labId);
  };

  const search = (event) => {
    const updatedFilteredListOfLabs = listOfLabs.filter((lab) => {
      let isMatch;
      switch (searchType.value) {
        case "title":
          isMatch = lab.title.includes(event.target.value);
          break
        case "tag":
          let index = lab.metadata.tags.findIndex((element) =>
            element.includes(event.target.value)
          );
          isMatch = index > -1;
          break
        default:
          break;
      }
      return isMatch
    });

    setFilteredListOfLabs(updatedFilteredListOfLabs);
  };
  const selectStyle = {
    control: (styles) => {
      return { ...styles, marginRight: "10px" };
    },
  };
  return (
    <div className="Home">
      <h2>Title</h2>

      <div id="searchArea">
        <div id="searchBar">
          <Select
            className="selectSearchBy"
            styles={selectStyle}
            options={options}
            value={searchType}
            onChange={(value) => handleChange(value)}
            defaultValue={{ label: "by Tag", value: "tag" }}
          />
          <input type="text" onChange={search}></input>
        </div>
        {/* <div id="totalLabs">
          <p>Total: 1240312 labs</p>
        </div>  */}
      </div>

      <div id="results">
        <ul>
          {filteredListOfLabs.map((lab, index) => {
            return (
              <LabItem
                key={index}
                title={lab.title}
                tags={lab.metadata.tags}
                level={lab.metadata.level}
                onClick={() => {
                  handleClickLabItem(lab.id);
                }}
              ></LabItem>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
