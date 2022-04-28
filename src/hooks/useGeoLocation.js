import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: [],
    address: "",
    state: "",
  });

  const onSuccess = async (currentLocation) => {
    const { latitude, longitude } = currentLocation.coords;
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=29a19903e72d4a7482df4c350fbffa0f`
    )
      .then((res) => res.json())
      .then((result) => {
        let state = result.results[0].components.state;
        let address = result.results[0].formatted;
        setLocation((prevState) => ({ ...prevState, address, state }));
      });

    setLocation({
      loaded: true,
      coordinates: [latitude, longitude],
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: "0",
        message: "Geolocation nto supported!",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeoLocation;
