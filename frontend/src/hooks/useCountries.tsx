"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2');
        const countriesToExclude = ['RU', 'BY'];
        const countryList = response.data
          .filter((country: { cca2: string }) => !countriesToExclude.includes(country.cca2))
          .map((country: { cca2: any; name: { common: any } }) => ({
            value: country.cca2,
            label: country.name.common,
          }))
          .sort((a: { label: string }, b: { label: any }) => a.label.localeCompare(b.label));
        setCountries(countryList);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
}

export default useCountries;