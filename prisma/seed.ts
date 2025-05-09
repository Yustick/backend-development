import { PrismaClient } from '@prisma/client';
import { Role } from 'src/roles/role.enum';
const prisma = new PrismaClient();

async function main() {
    await prisma.role.upsert({
        where: { name: Role.USER },
        update: {},
        create: { name: Role.USER },
    });

    await prisma.role.upsert({
        where: { name: Role.ADMIN },
        update: {},
        create: { name: Role.ADMIN },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
