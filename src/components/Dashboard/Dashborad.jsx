import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getAllUsers } from "../../redux/actions/admin";
import { Link } from "react-router-dom";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const Dashborad = () => {
  const { users, loading, message, error } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    dispatch(getAllUsers());
  }, [dispatch, message, error]);

  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = users.filter((user) =>
      user.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const handleSelect = (date) => {
    let filtered = allProducts.filter((product) => {
      let productDate = new Date(product["createdAt"]);
      return (
        productDate >= date.selection.startDate &&
        productDate <= date.selection.endDate
      );
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setProducts(filtered);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <div>
      <h1 className="font-bold text-3xl p-10">All Users</h1>
      <Link className="p-10 underline" to={"/profile"}>
        prev
      </Link>

      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        className="rounded-md bg-transparent px-3 py-2 text-sm  border-2 border-neutral-950 font-semibold text-black shadow-smfocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
        placeholder="Type to search.."
      />

      <div className="p-10">
        <DateRangePicker
          className=" sm:w-52 w-72"
          ranges={[selectionRange]}
          onChange={handleSelect}
        />
      </div>

      <div className="m-10 lg:flex-row md:flex-row xl:flex sm:flex-col items-center justify-center flex-wrap">
        {filteredUsers &&
          filteredUsers.map((item) => (
            <div
              key={item._id}
              className="relative mb-10  mr-10 h-[400px] w-[300px] rounded-md "
            >
              <img
                src={item.avatar.url}
                alt="AirMax Pro"
                className="z-0  h-full w-full rounded-md object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-left">
                <h1 className="text-lg font-semibold text-white">
                  <i>{item._id}</i>
                </h1>
                <p className="mt-2 text-sm text-gray-300">{item.name}</p>
                <p className="mt-2 text-sm text-gray-300">{item.email}</p>
                <p className="mt-2 text-sm text-gray-300">
                  {item.createdAt.split("T")[0]}
                </p>
                <p className="mt-2 text-sm text-green-400">{item.role}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashborad;
