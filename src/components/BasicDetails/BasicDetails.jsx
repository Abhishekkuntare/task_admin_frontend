import React, { useState } from "react";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Shipping = () => {
  const { Info } = useSelector((state) => state.details);

  const [hNo, setHNo] = useState(Info.hNo);
  const [city, setCity] = useState(Info.city);
  const [country, setCountry] = useState(Info.country);
  const [state, setState] = useState(Info.state);
  const [phoneNo, setPhoneNo] = useState(Info.phoneNo);
  const [pinCode, setPinCode] = useState(Info.pinCode);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(hNo, city, country, state, phoneNo, pinCode);

    dispatch({
      type: "detailsInfo",
      payload: { hNo, city, country, state, phoneNo, pinCode },
    });
    localStorage.setItem(
      "Info",
      JSON.stringify({
        hNo,
        city,
        country,
        state,
        phoneNo,
        pinCode,
      })
    );
    navigate("/profile");
  };

  return (
    <section>
      <div className=" flex items-center justify-center">
        <div className="flex items-center justify-center px-1 py-5 ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl mb-10 text-center">
              Basic Details
            </h2>
            <div className="space-y-5">
              <form onSubmit={submitHandler}>
                <div>
                  <label>H. No</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter House no."
                    value={hNo}
                    onChange={(e) => setHNo(e.target.value)}
                    className="flex mt-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div>
                  <label>Country</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((i) => (
                        <option key={i.isoCode} value={i.isoCode}>
                          {i.name}
                        </option>
                      ))}
                  </select>
                </div>

                {country && (
                  <div>
                    <label>State</label>
                    <select
                      className="flex mt-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((i) => (
                          <option value={i.isoCode} key={i.isoCode}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <div>
                  <label>City</label>
                  <input
                    className="flex mt-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div>
                  <label>Pin Code.</label>
                  <input
                    className="flex mt-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                    type="number"
                    placeholder="Enter Pincode"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>

                <div>
                  <label>Phone No.</label>
                  <input
                    className="flex mt-2 h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                    type="number"
                    placeholder="Enter Phone No."
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>

                <Link to={"/"}>
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 mt-5 mb-5"
                    type="submit"
                  >
                    Previous
                  </button>
                </Link>
                <button
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 mb-5"
                  type="submit"
                >
                  Submit
                </button>
                <Link to={"/profile"}>
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    type="submit"
                  >
                    Cancel
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shipping;
