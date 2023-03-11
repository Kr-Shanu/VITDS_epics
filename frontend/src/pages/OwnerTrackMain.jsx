// import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import NavbarComponent from "../components/NavbarComponent";
import useFetchData from "../api/getAllMerchant";
import { useSelector } from "react-redux";


function OwnerTrackMain() {

  const items = useSelector(state => state);
  console.log("Items.threat = :", items.threat);

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
              <CardComponent key={car} carNo={car} location="Grand Trunk Road" />
            )
          }) : "No dat found"
        }
      </div>
    </>
  );
}

export default OwnerTrackMain;