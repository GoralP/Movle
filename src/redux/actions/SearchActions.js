import axios from "axios";
// import { toast } from "react-toastify";
import { config } from "../../common";

export const searchProperty = (data, history) => {
  const getToken = localStorage.getItem("token");

  // const id = localStorage.getItem("id");
  const lt = localStorage.getItem("searchData");

  const searchDataArray = lt !== "" && lt !== null ? JSON.parse(lt) : "";

  const formData = new FormData();
  if (searchDataArray && searchDataArray.location) {
    formData.append("location", searchDataArray.location);
  }
  if (searchDataArray && searchDataArray.property_type) {
    formData.append("property_type", searchDataArray.property_type);
  }
  if (searchDataArray && searchDataArray.ready_to_sell) {
    formData.append("ready_to_sell", searchDataArray.ready_to_sell);
  }

  if (searchDataArray && searchDataArray.min_bed_no) {
    formData.append("min_bed_no", searchDataArray.min_bed_no);
  }

  if (searchDataArray && searchDataArray.max_bed_no) {
    formData.append("max_bed_no", searchDataArray.max_bed_no);
  }

  if (searchDataArray && searchDataArray.min_length) {
    formData.append("min_length", searchDataArray.min_length);
  }

  if (searchDataArray && searchDataArray.max_length) {
    formData.append("max_length", searchDataArray.max_length);
  }

  if (searchDataArray && searchDataArray.min_price) {
    formData.append("min_price", searchDataArray.min_price);
  }

  if (searchDataArray && searchDataArray.max_price) {
    formData.append("max_price", searchDataArray.max_price);
  }

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  // if (data["location"] != "") {
  //   location = data["location"];
  // }
  // if (searchDataArray.location != "") {
  //   location = searchDataArray.location;
  // }
  // if (searchDataArray.location == "") {
  //   location = "";
  // }

  // var location = "";
  // if (searchDataArray.location !== null) {
  //   location = searchDataArray.location;
  // } else {
  //   location = "";
  // }

  // if (data["location"] != "") {
  //   formData.append("location", searchDataArray.location);
  // }

  var living_space = {};
  living_space["min_size"] = data["min_size"];
  living_space["max_size"] = data["max_size"];
  living_space["min_bath_room"] = data["min_bath_room"];
  living_space["max_bath_room"] = data["max_bath_room"];
  living_space["min_recep_room"] = data["min_recep_room"];
  living_space["max_recep_room"] = data["max_recep_room"];
  living_space["min_en_suit"] = data["min_en_suit"];
  living_space["max_en_suit"] = data["max_en_suit"];
  living_space["open_plan"] = data["open_plan"];

  var additional_rooms = {};
  additional_rooms["utility_room"] = data["utility_room"];
  additional_rooms["cellar"] = data["cellar"];
  additional_rooms["conservatory"] = data["conservatory"];
  additional_rooms["play_room"] = data["play_room"];
  additional_rooms["garden_room"] = data["garden_room"];
  additional_rooms["out_buildings"] = data["out_buildings"];

  var external = {};
  external["min_garden_length"] = data["min_garden_length"];
  external["max_garden_length"] = data["max_garden_length"];
  external["garden_type"] = data["garden_type"];
  external["garden_facing_south"] = data["garden_facing_south"];
  external["parking"] = data["parking"];
  external["min_land"] = data["min_land"];
  external["max_land"] = data["max_land"];

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

  // formData.append("user_id", `${id}`);
  formData.append("living_space", JSON.stringify(living_space));
  formData.append("additional_rooms", JSON.stringify(additional_rooms));
  formData.append("external", JSON.stringify(external));
  formData.append("building", JSON.stringify(building));
  formData.append("anything_else", JSON.stringify(anything_else));

  return (dispatch) => {
    dispatch({ type: "SEARCH_PROPERTY_FETCH_PENDING" });

    axios
      .post(`${config.apiUrl}/search_property`, formData, {
        headers: {
          key: "351292hb22fe342a41370e16c1510ab9867031516mz1209",
          token: `${getToken}`,
        },
      })
      .then((res) => {
        localStorage.setItem("searchData", "");
        dispatch({
          type: "SEARCH_PROPERTY_FETCH_SUCCESS",
          searchPropertyData: res.data.Result,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SEARCH_PROPERTY_FETCH_FAILURE",
          message: error.message,
        });
      });
  };
};
