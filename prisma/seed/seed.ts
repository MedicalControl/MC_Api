import { prismaClient } from "../../src";
import fs from 'fs';
import { InternalException } from "../../src/exceptions/internal-exception";
import { ErrorCode } from "../../src/exceptions/root";
import { hashSync } from 'bcrypt';
import { JWT_ROUND } from "../../src/config";

export async function seed() {
    try {
        const countDepartment = await prismaClient.distric.count();
        const countUser = await prismaClient.user.count();
        const countSpeciality = await prismaClient.speciality.count();
        if (countDepartment === 0) {
            const data = JSON.parse(fs.readFileSync('prisma/seed/data_departments.json', 'utf-8'));
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

        if (countUser == 0) {
            const data = JSON.parse(fs.readFileSync('prisma/seed/data_user.json', 'utf-8'));
            for (const user of data) {

                await prismaClient.patient.create({
                    data: {
                        name: user.name,
                        lastname: user.lastname,
                        address: user.address,
                        birthDate: user.birthDate,
                        bloodType: user.bloodType,
                        ocupation: user.ocupation,
                        inssnumber: user.inssnumber,
                        idCard: user.idCard,
                        sex: user.sex,
                        number: user.number,
                        user: {
                            create: {
                                password: hashSync(user.password, JWT_ROUND),
                                email: user.email
                            }
                        },
                        municipality: {
                            connect: { id: user.municipalityid }
                        },
                        district: {
                            connect: { id: user.districtid }
                        }
                    }
                })
            }
        }
        if (countSpeciality == 0){
            const data = JSON.parse(fs.readFileSync('prisma/seed/data.json', 'utf-8'));
            for (const specialty of data.specialty)
            {
                await prismaClient.speciality.create({
                    data: specialty
                })
            }
        }
    } catch (err) {
        throw new InternalException("Some failed", err, ErrorCode.INTERNALEXCEPTION);
    }
}


seed().then(() => {
    console.log('seed was successful ');
}).catch((err) => {
    console.log('Err: ', err);
})