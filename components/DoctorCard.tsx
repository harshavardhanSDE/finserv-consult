import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, MapPin } from "lucide-react"
import { Doctor } from "@/data/types"

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card data-testid="doctor-card" className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6 flex gap-4">
          <Avatar className="h-20 w-20 rounded-md">
            <AvatarImage src={doctor.photo} alt={doctor.name} />
            <AvatarFallback className="rounded-md">{doctor.name_initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 data-testid="doctor-name" className="font-semibold text-lg">{doctor.name}</h3>
                <p data-testid="doctor-speciality" className="text-sm text-muted-foreground">
                  {doctor.specialities.map((s) => s.name).join(", ")}
                </p>
                <p className="text-sm text-muted-foreground">{doctor.languages.join(", ")}</p>
                <p data-testid="doctor-experience" className="text-sm text-muted-foreground">{doctor.experience} yrs exp.</p>
              </div>
              <div className="text-right">
                <p data-testid="doctor-fee"className="font-semibold">₹ {doctor.fees}</p>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Building2 className="h-4 w-4 mr-1" />
                <span>{doctor.clinic.name}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{doctor.clinic.address.locality}, {doctor.clinic.address.city}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Appointment</Button>
        </div>
      </CardContent>
    </Card>
  )
}
