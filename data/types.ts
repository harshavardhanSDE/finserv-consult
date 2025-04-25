interface Speciality {
    name: string;
  }
  
  interface Address {
    locality: string;
    city: string;
    address_line1: string;
    location: string; // or { lat: number; lng: number } if parsed
    logo_url: string;
  }
  
  interface Clinic {
    name: string;
    address: Address;
  }
  
  export interface Doctor {
    id: string;
    name: string;
    name_initials: string;
    photo: string;
    doctor_introduction: string;
    specialities: Speciality[];
    fees: string;
    experience: string;
    languages: string[];
    clinic: Clinic;
    video_consult: boolean;
    in_clinic: boolean;
  }
  
  export type DoctorList = Doctor[];
  