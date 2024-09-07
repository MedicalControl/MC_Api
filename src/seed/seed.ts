import { prismaClient } from "..";
import fs from 'fs';
import { InternalException } from "../exceptions/internal-exception";
import { ErrorCode } from "../exceptions/root";

export async function seed() {
    try {
        const countDepartment = await prismaClient.distric.count();
        if (countDepartment === 0) {
            console.log('The tables are empty');

            const data = JSON.parse(fs.readFileSync('src/seed/data_departments.json', 'utf-8'));
            const departments = data.departments;

            for (const dept of departments) {
                const createdDepartment = await prismaClient.distric.create({
                    data: {
                        name: dept.name,
                    },
                });
                for (const municipalityName of dept.municipalities) {
                    await prismaClient.municipality.create({
                        data: {
                            name: municipalityName,
                            districid: createdDepartment.id,
                        },
                    });
                }
            }
            console.log('Data has been seeded successfully');
        } else {
            console.log("The tables aren't empty");
        }
    } catch (err) {
        throw new InternalException("Some failed", err, ErrorCode.INTERNALEXCEPTION);
    }
}
