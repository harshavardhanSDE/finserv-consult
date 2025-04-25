import { DoctorList } from "../types";

export const getDataFromUrl = async (): Promise<DoctorList> => {
    try {
      const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: DoctorList = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching JSON:', error);
      return [];
    }
  };
  