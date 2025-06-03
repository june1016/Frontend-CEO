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