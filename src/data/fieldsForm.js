export const getFieldsGroups = ({ teachers, universities, students }) => [
  {
    type: "text",
    name: "name",
    label: "Nombre del Grupo"
  },
  {
    type: "text",
    name: "description",
    label: "Descripción del Grupo"
  },
  {
    type: "select",
    name: "teacher",
    label: "Docente Asignado",
    options: teachers.map(t => ({
      label: `${t.name} ${t.lastName}`,
      value: t.id
    }))
  },
  {
    type: "select",
    name: "university",
    label: "Universidad",
    options: universities.map(u => ({
      label: u.name,
      value: u.id
    }))
  },
  {
    type: "autocomplete",
    name: "students",
    label: "Estudiantes",
    options: students,
    getOptionLabel: s => `${s.name} ${s.lastName}`,
    multiple: true
  }
];

export const fieldsUniversity = [
  {
    type: "text",
    name: "name",
    label: "Nombre"
  },
  {
    type: "text",
    name: "city",
    label: "Ciudad"
  },
  {
    type: "text",
    name: "country",
    label: "País"
  }
];

export const getFieldsUsers = ({ rols, showPassword, setShowPassword, isEditing }) => [
  {
    type: "text",
    name: "name",
    label: "Nombre",
  },
  {
    type: "text",
    name: "lastName",
    label: "Apellido",
  },
  {
    type: "text",
    name: "email",
    label: "Correo",
  },
  {
    type: "password",
    name: "password",
    label: "Contraseña",
    required: true,

  },
  {
    type: "select",
    name: "rol",
    label: "Rol",
    options: rols.map((r) => ({
      label: r.name_rol,
      value: r.id,
    })),
  },
];

export const fieldsAmountEdit = [
  {
    name: "amount",
    label: "Valor (COP)",
    type: "number",
  },
];

export const fieldsRawMaterialEdit = [
  {
    name: "quantity",
    label: "Cantidad",
    type: "number",
  },
  {
    name: "unit_cost",
    label: "Costo Unitario (COP)",
    type: "number",
  }
];

export const fieldsProductInventoryEdit = [
  {
    name: "quantity",
    label: "Cantidad",
    type: "number",
  },
  {
    name: "unit_cost",
    label: "Costo Unitario (COP)",
    type: "number",
  },
];

