// import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import NavbarComponent from "../components/NavbarComponent";
import useFetchData from "../api/getAllMerchant";


function OwnerTrackMain() {

  var cars;
  const {data, loading} = useFetchData();
  cars = loading ? null : data[0]?.car_no;

  return (
    <>
      <NavbarComponent />
      <div className="container">
        {
          cars !== null ? cars.map((car) => {
            return(
              <CardComponent carNo={car} location="Grand Trunk Road" />
            )
          }) : "No dat found"
        }
      </div>
    </>
  );
}

export default OwnerTrackMain;