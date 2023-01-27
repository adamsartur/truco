import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {

    await prisma.cards.deleteMany()
    await prisma.gameState.deleteMany()
    await prisma.player.deleteMany()


    await prisma.cards.create({
        data: {
            number: 1,
            suit: 'S',
            value: 13,
        }
    })
    await prisma.cards.create({
        data: {
            number: 1,
            suit: 'C',
            value: 12,
        }
    })
    await prisma.cards.create({
        data: {
            number: 7,
            suit: 'S',
            value: 11,
        }
    })
    await prisma.cards.create({
        data: {
            number: 7,
            suit: 'D',
            value: 10,
        }
    })


    await prisma.cards.create({
        data: {
            number: 3,
            suit: 'S',
            value: 9,
        }
    })
    await prisma.cards.create({
        data: {
            number: 3,
            suit: 'C',
            value: 9,
        }
    })
    await prisma.cards.create({
        data: {
            number: 3,
            suit: 'D',
            value: 9,
        }
    })
    await prisma.cards.create({
        data: {
            number: 3,
            suit: 'H',
            value: 9,
        }
    })


    await prisma.cards.create({
        data: {
            number: 2,
            suit: 'S',
            value: 8,
        }
    })
    await prisma.cards.create({
        data: {
            number: 2,
            suit: 'C',
            value: 8,
        }
    })
    await prisma.cards.create({
        data: {
            number: 2,
            suit: 'D',
            value: 8,
        }
    })
    await prisma.cards.create({
        data: {
            number: 2,
            suit: 'H',
            value: 8,
        }
    })



    // await prisma.cards.create({
    //     data: {
    //         number: 1,
    //         suit: 'S',
    //         value: 7,
    //     }
    // })
    // await prisma.cards.create({
    //     data: {
    //         number: 1,
    //         suit: 'C',
    //         value: 7,
    //     }
    // })
    await prisma.cards.create({
        data: {
            number: 1,
            suit: 'D',
            value: 7,
        }
    })
    await prisma.cards.create({
        data: {
            number: 1,
            suit: 'H',
            value: 7,
        }
    })

    await prisma.cards.create({
        data: {
            number: 12,
            suit: 'S',
            value: 6,
        }
    })
    await prisma.cards.create({
        data: {
            number: 12,
            suit: 'C',
            value: 6,
        }
    })
    await prisma.cards.create({
        data: {
            number: 12,
            suit: 'D',
            value: 6,
        }
    })
    await prisma.cards.create({
        data: {
            number: 12,
            suit: 'H',
            value: 6,
        }
    })

    await prisma.cards.create({
        data: {
            number: 11,
            suit: 'S',
            value: 5,
        }
    })
    await prisma.cards.create({
        data: {
            number: 11,
            suit: 'C',
            value: 5,
        }
    })
    await prisma.cards.create({
        data: {
            number: 11,
            suit: 'D',
            value: 5,
        }
    })
    await prisma.cards.create({
        data: {
            number: 11,
            suit: 'H',
            value: 5,
        }
    })

    await prisma.cards.create({
        data: {
            number: 10,
            suit: 'S',
            value: 4,
        }
    })
    await prisma.cards.create({
        data: {
            number: 10,
            suit: 'C',
            value: 4,
        }
    })
    await prisma.cards.create({
        data: {
            number: 10,
            suit: 'D',
            value: 4,
        }
    })
    await prisma.cards.create({
        data: {
            number: 10,
            suit: 'H',
            value: 4,
        }
    })

    // await prisma.cards.create({
    //     data: {
    //         number: 7,
    //         suit: 'S',
    //         value: 4,
    //     }
    // })
    await prisma.cards.create({
        data: {
            number: 7,
            suit: 'C',
            value: 3,
        }
    })
    // await prisma.cards.create({
    //     data: {
    //         number: 7,
    //         suit: 'D',
    //         value: 4,
    //     }
    // })
    await prisma.cards.create({
        data: {
            number: 7,
            suit: 'H',
            value: 3,
        }
    })



    await prisma.cards.create({
        data: {
            number: 6,
            suit: 'S',
            value: 2,
        }
    })
    await prisma.cards.create({
        data: {
            number: 6,
            suit: 'C',
            value: 2,
        }
    })
    await prisma.cards.create({
        data: {
            number: 6,
            suit: 'D',
            value: 2,
        }
    })
    await prisma.cards.create({
        data: {
            number: 6,
            suit: 'H',
            value: 2,
        }
    })


    await prisma.cards.create({
        data: {
            number: 5,
            suit: 'S',
            value: 1,
        }
    })
    await prisma.cards.create({
        data: {
            number: 5,
            suit: 'C',
            value: 1,
        }
    })
    await prisma.cards.create({
        data: {
            number: 5,
            suit: 'D',
            value: 1,
        }
    })
    await prisma.cards.create({
        data: {
            number: 5,
            suit: 'H',
            value: 1,
        }
    })


    await prisma.cards.create({
        data: {
            number: 4,
            suit: 'S',
            value: 0,
        }
    })
    await prisma.cards.create({
        data: {
            number: 4,
            suit: 'C',
            value: 0,
        }
    })
    await prisma.cards.create({
        data: {
            number: 4,
            suit: 'D',
            value: 0,
        }
    })
    await prisma.cards.create({
        data: {
            number: 4,
            suit: 'H',
            value: 0,
        }
    })

}

main()
    .then(async () =>{
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });