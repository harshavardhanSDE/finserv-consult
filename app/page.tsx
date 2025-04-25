'use client'

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { DoctorCard } from "@/components/DoctorCard"
import { Filters } from "@/components/Filters"
import { DoctorList } from "@/data/types"
import { getDataFromUrl } from "@/data/fetch/fetch"

interface FiltersType {
  sort: "price" | "experience"
  specialties: string[]
  mode: "video-consult" | "in-clinic" | "all"
}

export default function DoctorSearchPage() {
  const [doctors, setDoctors] = useState<DoctorList>([])
  const [filters, setFilters] = useState<FiltersType>({
    sort: "price",
    specialties: [],
    mode: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch doctors on mount
  useEffect(() => {
    getDataFromUrl().then((data) => setDoctors(data))
  }, [])

  // Filter doctors based on specialties, mode, and search query
  const filteredDoctors = doctors
    .filter((doc) => {
      // Matches specialties
      const matchesSpecialties =
        filters.specialties.length === 0 ||
        doc.specialities.some((s) => filters.specialties.includes(s.name))

      // Matches mode (video, in-clinic, or all)
      const matchesMode =
        filters.mode === "all" ||
        (filters.mode === "video-consult" && doc.video_consult) ||
        (filters.mode === "in-clinic" && doc.in_clinic)

      // Matches search query (doctor name, specialties, or clinic name)
      const matchesSearchQuery =
        searchQuery.trim() === "" ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialities.some((s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        doc.clinic.name.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesSpecialties && matchesMode && matchesSearchQuery
    })
    .sort((a, b) => {
      if (filters.sort === "price") return parseInt(a.fees) - parseInt(b.fees)
      if (filters.sort === "experience") return parseInt(b.experience) - parseInt(a.experience)
      return 0
    })

  return (
    <div className="flex min-h-screen">
      <Filters filters={filters} setFilters={setFilters} />

      <div className="flex-1 p-6 space-y-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-6">
            <Input
              data-testid="autocomplete-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Symptoms, Doctors, Specialists, Clinics"
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>

          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground">No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
