import { prismaClient } from "../../src";
import fs from "fs";
import { InternalException } from "../../src/exceptions/internal-exception";
import { ErrorCode } from "../../src/exceptions/root";

import { Prisma } from "@prisma/client";

const especialidadesData: Prisma.especialidadCreateInput[] = [
  {
    nombre: "Oftalmologia",
  },
];

const tiposExamenes: Prisma.tipoexamenCreateInput[] = [
  {
    nombre: "Examen de orina",
  },
  {
    nombre: "Examen de sangre",
  },
  {
    nombre: "Examen de heces",
  },
];

const tipoMedicamentoData: Prisma.tipoexamenCreateInput[] = [
  { nombre: "Tableta o pastilla" },
  { nombre: "Jarabe" },
  { nombre: "Inyeccion" },
  { nombre: "Cremas" },
];

const medicamentos: Prisma.medicamentoCreateInput[] = [
  {
    nombre: "Paracetamol",
    tipomedicamento: { connect: { pk_tipomedicamento: 1 } },
  },
  {
    nombre: "Ibuprofeno",
    tipomedicamento: { connect: { pk_tipomedicamento: 1 } },
  },
  {
    nombre: "Amoxicilina",
    tipomedicamento: { connect: { pk_tipomedicamento: 1 } },
  },
  {
    nombre: "Azitromicina",
    tipomedicamento: { connect: { pk_tipomedicamento: 1 } },
  },
  {
    nombre: "Salbutamol",
    tipomedicamento: { connect: { pk_tipomedicamento: 2 } },
  },
  {
    nombre: "Clorfenamina",
    tipomedicamento: { connect: { pk_tipomedicamento: 2 } },
  },
  {
    nombre: "Ambroxol",
    tipomedicamento: { connect: { pk_tipomedicamento: 2 } },
  },
  {
    nombre: "Insulina",
    tipomedicamento: { connect: { pk_tipomedicamento: 3 } },
  },
  {
    nombre: "Penicilina",
    tipomedicamento: { connect: { pk_tipomedicamento: 3 } },
  },
  {
    nombre: "Ceftriaxona",
    tipomedicamento: { connect: { pk_tipomedicamento: 3 } },
  },
  {
    nombre: "Ibuprofeno en crema",
    tipomedicamento: { connect: { pk_tipomedicamento: 4 } },
  },
  {
    nombre: "Ketoconazol",
    tipomedicamento: { connect: { pk_tipomedicamento: 4 } },
  },
  {
    nombre: "Diclofenaco en gel",
    tipomedicamento: { connect: { pk_tipomedicamento: 4 } },
  },
  {
    nombre: "Loratadina",
    tipomedicamento: { connect: { pk_tipomedicamento: 1 } },
  },
  {
    nombre: "Ranitidina",
    tipomedicamento: { connect: { pk_tipomedicamento: 1 } },
  },
  {
    nombre: "Metformina",
    tipomedicamento: { connect: { pk_tipomedicamento: 1 } },
  },
  {
    nombre: "Omeprazol",
    tipomedicamento: { connect: { pk_tipomedicamento: 1 } },
  },
  {
    nombre: "Dexametasona",
    tipomedicamento: { connect: { pk_tipomedicamento: 3 } },
  },
  {
    nombre: "Bromhexina",
    tipomedicamento: { connect: { pk_tipomedicamento: 2 } },
  },
  {
    nombre: "Naproxeno",
    tipomedicamento: { connect: { pk_tipomedicamento: 1 } },
  },
];

export async function seed() {
  try {
    const countDepartment = await prismaClient.departamento.count();
    const countEspecialidades = await prismaClient.especialidad.count();
    const counttipomedicamento = await prismaClient.tipomedicamento.count();
    const countmedicamentos = await prismaClient.medicamento.count();
    const counttiposExamenes = await prismaClient.tipoexamen.count();

    if (counttiposExamenes == 0)
      for (const tipExamen of tiposExamenes)
        await prismaClient.tipoexamen.create({
          data: tipExamen,
        });
    if (countEspecialidades == 0)
      for (const espec of especialidadesData)
        await prismaClient.especialidad.create({
          data: espec,
        });

    if (counttipomedicamento == 0)
      for (const tipoMed of tipoMedicamentoData)
        await prismaClient.tipomedicamento.create({ data: tipoMed });

    if (countmedicamentos == 0)
      for (const med of medicamentos)
        await prismaClient.medicamento.create({ data: med });
    if (countDepartment === 0) {
      const data = JSON.parse(
        fs.readFileSync("prisma/seed/data_departments.json", "utf-8")
      );
      const departments = data.departments;

      for (const dept of departments) {
        const createdDepartment = await prismaClient.departamento.create({
          data: {
            nombre: dept.nombre,
          },
        });

        for (const municipalityName of dept.municipalities) {
          await prismaClient.municipio.create({
            data: {
              nombre: municipalityName,
              fk_departamento: createdDepartment.pk_departamento, // Usar el ID generado
            },
          });
        }
      }
      console.log("Data has been seeded successfully");
    } else {
      console.log("The tables aren't empty");
    }
  } catch (err) {
    throw new InternalException(
      "Some failed",
      err,
      ErrorCode.INTERNALEXCEPTION
    );
  }
}

seed()
  .then(async () => {
    console.log("seed was successful ");
    await prismaClient.$disconnect();
    process.exit(0);
  })
  .catch(async (err) => {
    console.log(err);
    await prismaClient.$disconnect();
    process.exit(1);
  });
