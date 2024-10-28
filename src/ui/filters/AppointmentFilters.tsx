import { BranchesProperties } from "@data/branch.data";
import { HoursProperties } from "@data/hour.data";
import { ServicesProperties } from "@data/service.data";
import { Button, Select, SelectItem } from "@nextui-org/react";

export type AppointmentFiltersProperties = {
  branchesSlots: BranchesProperties[];
  servicesSlots: ServicesProperties[];
  hourSlots: HoursProperties[];
  selectedStatus: string;
  selectedBranch: string;
  selectedService: string;
  selectedHour: string;
  selectedDate: string;
  handleFilterChange: any;
  clearFilters: any;
};

export default function AppointmentFilters({
  branchesSlots,
  servicesSlots,
  hourSlots,
  selectedStatus,
  selectedBranch,
  selectedService,
  selectedHour,
  selectedDate,
  handleFilterChange,
  clearFilters,
}: AppointmentFiltersProperties) {
  return (
    <>
      <Select
        variant="faded"
        size="sm"
        label="Estado"
        name="status"
        radius="full"
        value={selectedStatus}
        selectedKeys={[selectedStatus]}
        defaultSelectedKeys={[selectedStatus]}
        onChange={handleFilterChange}
      >
        <SelectItem key="Completadas" title="Completadas">
          Completadas
        </SelectItem>
        <SelectItem key="Pendientes" title="Pendientes">
          Pendientes
        </SelectItem>
      </Select>

      <Select
        variant="faded"
        size="sm"
        radius="full"
        label="Sucursal"
        name="branch"
        value={selectedBranch}
        items={branchesSlots}
        selectedKeys={[selectedBranch]}
        defaultSelectedKeys={[selectedBranch]}
        onChange={handleFilterChange}
      >
        {(branchesSlots) => (
          <SelectItem key={branchesSlots.name}>{branchesSlots.name}</SelectItem>
        )}
      </Select>

      <Select
        variant="faded"
        size="sm"
        label="Servicio"
        name="service"
        radius="full"
        value={selectedService}
        items={servicesSlots}
        selectedKeys={[selectedService]}
        defaultSelectedKeys={[selectedService]}
        onChange={handleFilterChange}
      >
        {(servicesSlots) => (
          <SelectItem key={servicesSlots.name}>{servicesSlots.name}</SelectItem>
        )}
      </Select>

      <Select
        variant="faded"
        size="sm"
        label="Hora"
        name="hour"
        radius="full"
        value={selectedHour}
        items={hourSlots}
        selectedKeys={[selectedHour]}
        defaultSelectedKeys={[selectedHour]}
        onChange={handleFilterChange}
      >
        {(hourSlots) => (
          <SelectItem key={hourSlots.time}>{hourSlots.time}</SelectItem>
        )}
      </Select>

      <Select
        variant="faded"
        size="sm"
        label="Fecha"
        name="date"
        radius="full"
        value={selectedDate}
        selectedKeys={[selectedDate]}
        defaultSelectedKeys={[selectedDate]}
        onChange={handleFilterChange}
      >
        <SelectItem key="Hoy" title="Hoy">
          Hoy
        </SelectItem>
        <SelectItem key="Ayer" title="Ayer">
          Ayer
        </SelectItem>
        <SelectItem key="Mañana" title="Mañana">
          Mañana
        </SelectItem>
        <SelectItem key="Semana Pasada" title="Semana Pasada">
          Semana Pasada
        </SelectItem>
        <SelectItem key="Hace 2 Semanas" title="Hace 2 Semanas">
          Hace 2 Semanas
        </SelectItem>
        <SelectItem key="Hace 3 Semanas" title="Hace 3 Semanas">
          Hace 3 Semanas
        </SelectItem>
        <SelectItem key="Hace 1 mes" title="Hace 1 mes">
          Hace 1 Mes
        </SelectItem>
        <SelectItem key="Hace más de 1 mes" title="Hace más de 1 mes">
          Hace más de 1 Mes
        </SelectItem>
      </Select>

      <Button
        className="min-w-fit"
        variant="flat"
        radius="full"
        color="danger"
        onClick={clearFilters}
      >
        Limpiar Filtros
      </Button>
    </>
  );
}
