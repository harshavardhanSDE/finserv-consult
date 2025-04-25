import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
  import { Checkbox } from "@/components/ui/checkbox"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Search } from "lucide-react"
  import { Button } from "@/components/ui/button"
  
  interface FiltersType {
    sort: "price" | "experience";
    specialties: string[];
    mode: "video-consult" | "in-clinic" | "all";
  }
  
  export function Filters({
    filters,
    setFilters,
  }: {
    filters: FiltersType;
    setFilters: (filters: FiltersType) => void;
  }) {
    return (
      <div data-testid="filter-header-speciality" className="w-64 p-4 border-r bg-white">
        <Collapsible defaultOpen className="mb-6">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 className="text-sm font-medium">Sort by</h3>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <RadioGroup
                data-testid="filter-header-sort"
              defaultValue={filters.sort}
              onValueChange={(val: FiltersType["sort"]) =>
                setFilters({ ...filters, sort: val })
              }
            >
              <div className="flex items-center space-x-2 py-1">
                <RadioGroupItem data-testid="sort-fees" value="price" id="price" />
                <Label htmlFor="price">Price: Low-High</Label>
              </div>
              <div className="flex items-center space-x-2 py-1">
                <RadioGroupItem data-testid="sort-experience" value="experience" id="experience" />
                <Label htmlFor="experience">Experience: Most Experience first</Label>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>
  
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">Filters</h3>
          <Button
            variant="link"
            size="sm"
            className="text-blue-600 h-auto p-0"
            onClick={() =>
              setFilters({ sort: "price", specialties: [], mode: "all" })
            }
          >
            Clear All
          </Button>
        </div>
  
        <Collapsible defaultOpen className="mb-6">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 className="text-sm font-medium">Specialities</h3>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            {[
  "General Physician",
  "Dentist",
  "Dermatologist",
  "Paediatrician",
  "Gynaecologist",
  "ENT",
  "Diabetologist",
  "Cardiologist",
  "Physiotherapist",
  "Endocrinologist",
  "Orthopaedic",
  "Ophthalmologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Psychiatrist",
  "Urologist",
  "Dietitian/Nutritionist",
  "Psychologist",
  "Sexologist",
  "Nephrologist",
  "Neurologist",
  "Oncologist",
  "Ayurveda",
    "Homeopath"
    ].map((spec) => (
              <div className="flex items-center space-x-2" key={spec}>
                <Checkbox
                data-testid={`filter-speciality-${spec}`}
                  id={spec}
                  checked={filters.specialties.includes(spec)}
                  onCheckedChange={(checked) => {
                    setFilters({
                      ...filters,
                      specialties: checked
                        ? [...filters.specialties, spec]
                        : filters.specialties.filter((s) => s !== spec),
                    })
                  }}
                />
                <Label htmlFor={spec}>{spec}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
  
        <Collapsible defaultOpen className="mb-6">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 className="text-sm font-medium">Mode of consultation</h3>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <RadioGroup
            data-testid="filter-header-moc"
              defaultValue={filters.mode}
              onValueChange={(val: FiltersType["mode"]) =>
                setFilters({ ...filters, mode: val })
              }
            >
              {[
                { label: "Video Consultation", value: "video-consult" },
                { label: "In-clinic Consultation", value: "in-clinic" },
                { label: "All", value: "all" },
              ].map((option) => (
                <div className="flex items-center space-x-2 py-1" key={option.value}>
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label data-testid={`filter-${option.value}`} htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  }
  