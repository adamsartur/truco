import {FastifyInstance} from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export async function appRoutes(app:FastifyInstance){

type PlayersProps = Array<{
    id: string,
    score: number,
    roundScore: number,
    isHand: boolean,
    lastBet: boolean,
    lastEnvido: boolean,
    envidoScore: number,
}>;

type CardsProps = Array<{
    id: string,
    suit: string,
    number: number,
    value: number,
    available: boolean,
}>;

app.patch('/new/game', async ()=>{
    await prisma.playerCards.deleteMany();
    await prisma.player.deleteMany();
    await prisma.gameState.deleteMany();
    await prisma.cards.updateMany({
        data: {
            available: true,
        }
    })
})

app.patch('/new/hand', async ()=>{
    function determineWinner(playersResponse: PlayersProps){

    }
    const gameStateProps = z.object({
        bet: z.number(),
        round: z.number()
    })

    if( await prisma.gameState.count() == 0){
        await prisma.gameState.create({
            data: {
                bet: 0,
                round: 0,
            }
        });
    }
    const gameState = await prisma.gameState.findFirst();
    const {bet, round} = gameStateProps.parse(gameState);

    //sorts so that winning player comes first 
    const players:PlayersProps = await prisma.player.findMany({
        orderBy: [
            { roundScore: 'desc', },
            {isHand: 'desc', }
    ],
    })

    //If game already started
    if(round > 0){
        //determine round winner
        console.log(players)
        const winningPlayer = players[0];
        const losingPlayer = players[1];

        console.log(winningPlayer)
        
        //give round points to winner
        //sets hand for next round
        console.log('//give round points to winner');
        await prisma.player.update({
            data: {
                score: (bet+winningPlayer.score),
                isHand: true,
                roundScore: 0,
            },
            where: {
                id: winningPlayer.id,
            }
        })
        await prisma.player.update({
            data: {
                isHand: false,
                roundScore: 0,
            },
            where: {
                id: losingPlayer.id,
            }
        })
    }

    //set environment for new round
    console.log('//set environment for new round');
    await prisma.playerCards.deleteMany();
    await prisma.cards.updateMany({
        data: {
            available: true,
        }
    })

    //gives new card hand to the players
    const cardsResponse:CardsProps = await prisma.$queryRaw`
        SELECT * 
        FROM cards
        WHERE cards.available == true
        ORDER BY random()
        LIMIT 6;
    `
    console.log(cardsResponse)

    if(cardsResponse.length > 0) {
        cardsResponse.map(async (card, i) => {
            //gives cards to player
            if(i < 3){
                await prisma.playerCards.create({
                    data: {
                        player_id: players[0].id,
                        card_id: card.id,
                    },
                })
            }else {
                await prisma.playerCards.create({
                    data: {
                        player_id: players[1].id,
                        card_id: card.id,
                    },
                })
            }
        
            //sets cards unavailable in deck
            await prisma.cards.update({
                where: {
                    id: card.id,
                },
                data: {
                    available: false,
                },
            })
        });
    }

    
})

app.get('/winner', async () =>{

    const players:PlayersProps = await prisma.player.findMany({
        orderBy: [{
            roundScore: 'desc',
        }, {
            isHand: 'desc',}],
    })

    return players


})

app.patch('/join/:name', async (request) => {
    const joinParams = z.object({
        name: z.string()
    })
    const { name } = joinParams.parse(request.params)

    console.log(name)
    
    if(await prisma.player.count() < 2){
        await prisma.player.create({
            data: {
                user: name,
            }
        })
    }
})

app.get('/cards', async(req) => {
    const  cardsCount = await prisma.cards.findMany()
    return cardsCount;
    console.log(cardsCount)
})

}