import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../common";

export const addProperty = (data, history) => {
  const id = localStorage.getItem("id");

  var isArea = [];

  var formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  var living_space = {};
  living_space["size"] = data["size"];
  living_space["bath_room"] = data["bath_room"];
  living_space["recep_room"] = data["recep_room"];
  living_space["en_suit"] = data["en_suit"];
  living_space["open_plan"] = data["open_plan"];

  var additional_rooms = {};
  additional_rooms["utility_room"] = data["utility_room"];
  additional_rooms["cellar"] = data["cellar"];
  additional_rooms["conservatory"] = data["conservatory"];
  additional_rooms["play_room"] = data["play_room"];
  additional_rooms["garden_room"] = data["garden_room"];
  additional_rooms["out_buildings"] = data["out_buildings"];

  var external = {};
  external["garden_length"] = data["garden_length"];
  external["garden_type"] = data["garden_type"];
  external["garden_facing_south"] = data["garden_facing_south"];
  external["parking"] = data["parking"];
  external["land"] = data["land"];

  var building = {};
  building["style"] = data["style"];
  building["condition"] = data["condition"];
  building["windows"] = data["windows"];
  building["loft_conversion"] = data["loft_conversion"];
  building["age"] = data["age"];
  building["period_features"] = data["period_features"];
  building["potential_expand"] = data["potential_expand"];
  building["heating"] = data["heating"];

  var anything_else = {};
  anything_else["chain_fee"] = data["chain_fee"];
  anything_else["sold_under_offer"] = data["sold_under_offer"];
  anything_else["keyword"] = data["keyword"];

  var area_name_array = [
    "Wifi",
    "Smoking allowed",
    "Dishwasher",
    "Cable-tv",
    "Animal allowed",
    "Washing Machine",
  ];
  for (let k = 0; k < 6; k++) {
    var isAreaObject = {};
    let m = k + 1;
    if (
      data["url_path" + m] !== "" &&
      data["url_path" + m] !== null &&
      data["url_path" + m] !== undefined
    ) {
      isAreaObject["pr_ar_id"] = m.toString();
      isAreaObject["ar_name"] = data["chk" + m];
      isAreaObject["url_path"] = data["url_path" + m];
      isAreaObject["is_checked"] = "1";

      isArea.push(isAreaObject);
    } else {
      isAreaObject["pr_ar_id"] = m.toString();
      isAreaObject["ar_name"] = area_name_array[k];
      isAreaObject["url_path"] = "";
      isAreaObject["is_checked"] = "0";
      isArea.push(isAreaObject);
    }
  }

  if (data["is_area"] == 1) {
    formData.append("area_data", JSON.stringify(isArea));
  }
  formData.append("user_id", `${id}`);

  formData.append("living_space", JSON.stringify(living_space));
  formData.append("additional_rooms", JSON.stringify(additional_rooms));
  formData.append("external", JSON.stringify(external));
  formData.append("building", JSON.stringify(building));
  formData.append("anything_else", JSON.stringify(anything_else));

  const getToken = localStorage.getItem("token");
  return (dispatch) => {
    dispatch({ type: "ADD_PROPERTY_FETCH_PENDING" });

    axios
      .post(`${config.apiUrl}/add_property`, formData, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "ADD_PROPERTY_FETCH_SUCCESS",
        });
        localStorage.setItem("property_id", res.data.Result[0].id);
        dispatch(getSingleProperty(res.data.Result[0].id));
        toast.success(res.data.ResponseMessage);
        localStorage.setItem("radius", "");
        localStorage.setItem("range", "");
        localStorage.setItem("single_range", "");
        localStorage.setItem("single_range_recp", "");
        localStorage.setItem("single_range_suites", "");
        localStorage.setItem("single_range_Land", "");
        localStorage.setItem("length_range", "");
        localStorage.setItem("age_range", "");
        history.push("/createproperty");
      })
      .catch((error) => {
        dispatch({
          type: "ADD_PROPERTY_FETCH_FAILURE",
          message: error.message,
        });
        toast.error("something went wrong");
      });
  };
};

export const allProperty = () => {
  const getToken = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const formData = new FormData();
  formData.append("user_id", `${id}`);
  return (dispatch) => {
    dispatch({ type: "ALL_PROPERTY_FETCH_PENDING" });

    axios
      .post(`${config.apiUrl}/get_my_property`, formData, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        console.log(res.length);
        dispatch({
          type: "ALL_PROPERTY_FETCH_SUCCESS",
          propertyData: res.data.Result,
        });
      })
      .catch((error) => {
        dispatch({
          type: "ALL_PROPERTY_FETCH_FAILURE",
          message: error.message,
        });
      });
  };
};

export const getSingleProperty = (p_id) => {
  const getToken = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  if (p_id !== "") {
    localStorage.setItem("property_id", p_id);
  } else {
    p_id = localStorage.getItem("property_id");
  }

  const get_property_id = localStorage.getItem("property_id");

  return (dispatch) => {
    dispatch({ type: "GET_SINGLE_PROPERTY_PENDING" });

    axios
      .get(`${config.apiUrl}/get_single_property/${get_property_id}`, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "GET_SINGLE_PROPERTY_SUCCESS",
          singleData: res.data.Result[0],
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_SINGLE_PROPERTY_FAILURE",
          message: error.message,
        });
      });
  };
};

export const deleteProperty = (pr_id) => {
  const getToken = localStorage.getItem("token");
  const user_id = localStorage.getItem("id");

  var data = new FormData();
  data.append("pr_id", `${pr_id}`);
  data.append("user_id", `${user_id}`);
  return (dispatch) => {
    dispatch({ type: "DELETE_PROPERTY_PENDING" });

    axios
      .post(`${config.apiUrl}/remove_property`, data, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        dispatch({ type: "DELETE_PROPERTY_SUCCESS" });
        dispatch(allProperty());
        toast.success(res.data.ResponseMessage);
      })
      .catch((error) => {
        dispatch({ type: "DELETE_PROPERTY_FAILURE", message: error.message });
        toast.success("something went wrong");
      });
  };
};

function mergeTwoString(str1, str2) {
  return Array.from(new Set([str1, str2].join(",").split(","))).join(",");
}

export const updateProperty = (data, history) => {
  const getToken = localStorage.getItem("token");
  const user_id = localStorage.getItem("id");
  const pr_id = localStorage.getItem("property_id");

  var isArea = [];

  var formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (
      key !== "front_house_img" &&
      key !== "lounge_img" &&
      key !== "back_house_img" &&
      key !== "bed1_img" &&
      key !== "bed2_img" &&
      key !== "kitchen_img" &&
      key !== "reception_img" &&
      key !== "garden_img" &&
      key !== "additional_upload"
    ) {
      formData.append(key, data[key]);
    }
  });

  var living_space = {};
  living_space["size"] = data["size"];
  living_space["bath_room"] = data["bath_room"];
  living_space["recep_room"] = data["recep_room"];
  living_space["en_suit"] = data["en_suit"];
  living_space["open_plan"] = data["open_plan"];

  var additional_rooms = {};
  additional_rooms["utility_room"] = data["utility_room"];
  additional_rooms["cellar"] = data["cellar"];
  additional_rooms["conservatory"] = data["conservatory"];
  additional_rooms["play_room"] = data["play_room"];
  additional_rooms["garden_room"] = data["garden_room"];
  additional_rooms["out_buildings"] = data["out_buildings"];

  var external = {};
  external["garden_length"] =
    data["garden_length"] ?? data["external"]["garden_length"] ?? "";
  external["garden_type"] =
    data["garden_type"] ?? data["external"]["garden_type"] ?? "";
  external["garden_facing_south"] =
    data["garden_facing_south"] ??
    data["external"]["garden_facing_south"] ??
    "";
  external["parking"] = data["parking"] ?? data["external"]["parking"] ?? "";
  external["land"] = data["land"] ?? data["external"]["land"] ?? "";

  var building = {};

  building["style"] = data["style"] ?? data["building"]["style"] ?? "";
  building["condition"] =
    data["condition"] ?? data["building"]["condition"] ?? "";
  building["windows"] = data["windows"] ?? data["building"]["windows"] ?? "";
  building["loft_conversion"] =
    data["loft_conversion"] ?? data["building"]["loft_conversion"] ?? "";
  building["age"] = data["age"] ?? data["building"]["age"] ?? "";
  building["period_features"] =
    data["period_features"] ?? data["building"]["period_features"] ?? "";
  building["potential_expand"] =
    data["potential_expand"] ?? data["building"]["potential_expand"] ?? "";
  building["heating"] = data["heating"] ?? data["building"]["heating"] ?? "";

  var anything_else = {};
  anything_else["chain_fee"] = data["chain_fee"];
  anything_else["sold_under_offer"] = data["sold_under_offer"];
  anything_else["keyword"] = data["keyword"];

  var area_name_array = [
    "Wifi",
    "Smoking allowed",
    "Dishwasher",
    "Cable-tv",
    "Animal allowed",
    "Washing Machine",
  ];
  console.log("testmk", data);

  for (let k = 0; k < 6; k++) {
    var isAreaObject = {};
    let m = k + 1;
    // console.log("data url", data["url_path" + m]);
    if (data) {
      if (data["url_path" + m] || data["url_path" + m] == "") {
        isAreaObject["pr_ar_id"] = m.toString();
        isAreaObject["ar_name"] = area_name_array[k];
        isAreaObject["url_path"] = data["url_path" + m];
        isAreaObject["is_checked"] =
          data["chk" + m] && data["url_path" + m] ? "1" : "0";
        isArea.push(isAreaObject);
        console.log("Checkkk", isAreaObject);
      } else {
        isAreaObject["pr_ar_id"] = m.toString();
        isAreaObject["ar_name"] = area_name_array[k];
        isAreaObject["url_path"] = "";
        isAreaObject["is_checked"] = "0";
        isArea.push(isAreaObject);

        // isAreaObject["pr_ar_id"] = data["area_details"][k]["pr_ar_id"];
        // isAreaObject["ar_name"] = data["area_details"][k]["ar_name"];
        // isAreaObject["url_path"] = data["area_details"][k]["url_path"];
        // isAreaObject["is_checked"] = data["area_details"][k]["is_checked"];
        // isArea.push(isAreaObject);
      }
    }
  }

  if (data["is_area"] == 1) {
    formData.append("area_data", JSON.stringify(isArea));
  } else if (["is_area"] == 0) {
    formData.append("area_data", []);
  }

  formData.append("property_id", `${pr_id}`);
  formData.append("user_id", `${user_id}`);

  formData.append("living_space", JSON.stringify(living_space));
  formData.append("additional_rooms", JSON.stringify(additional_rooms));
  formData.append("external", JSON.stringify(external));
  formData.append("building", JSON.stringify(building));
  formData.append("anything_else", JSON.stringify(anything_else));

  return (dispatch) => {
    dispatch({ type: "UPDATE_PROPERTY_PENDING" });

    axios
      .post(`${config.apiUrl}/edit_property`, formData, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
          token: `${getToken}`,
        },
      })

      .then((res) => {
        console.log(res);
        dispatch({
          type: "UPDATE_PROPERTY_SUCCESS",
        });
        toast.success(res.data.ResponseMessage);
        history.push("/viewproperties");
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_PROPERTY_FAILURE", message: error.message });
        toast.error("something went wrong");
      });
  };
};
