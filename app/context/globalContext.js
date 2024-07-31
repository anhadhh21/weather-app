"use client";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({children}) => {
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({});
    const [uvIndex, setUvIndex] = useState({});

    const fetchForecast = async () => {
        try {
            const res = await axios.get("api/weather");
           setForecast(res.data);
        } catch(error) {
            console.log("Error fetching forecast data: ", error.message);
        }
        };
        // Air Quality
  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };
 // five day forecast
 const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/fivedays?lat=${lat}&lon=${lon}`);

      setFiveDayForecast(res.data);
    } catch (error) {
      console.log("Error fetching five day forecast data: ", error.message);
    }
  };

  //fetch uv data
  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);

      setUvIndex(res.data);
    } catch (error) {
      console.error("Error fetching the forecast:", error);
    }
  };




        useEffect(() => {
            fetchForecast();
            fetchAirQuality();
             fetchFiveDayForecast();
             fetchUvIndex();            
        }, []);

        return (
            <GlobalContext.Provider value = {{
              forecast,
              airQuality,
            }}
            >
                <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
            </GlobalContext.Provider>
        );
    };

    export const useGlobalContext = () => useContext(GlobalContext);
    export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);