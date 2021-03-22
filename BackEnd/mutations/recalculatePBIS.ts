import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { Session } from '../types';
import { UserUpdateInput, PbisTeamUpdateInput } from '../.keystone/schema-types';
import {User} from '../schemas/User'



const graphql = String.raw;

async function recalculatePbis( root: any,
    { userId }: { userId: string },
    context: KeystoneContext
  ): Promise<UserUpdateInput> {
    console.log('Updating PBIS Count');
    console.log(userId)
    const student = await context.lists.User.findOne({
        where: { id: userId },
        resolveFields: graphql`
            id
             cards: _studentPbisCardsMeta{
             count
            }
             yearCards: _studentPbisCardsMeta(where:{counted:false}){
             count
            }
            taTeacher{
        id
        taTeam{
            id
        }
    }
        `,
      });

const taTeacher = await context.lists.User.findOne({
    where: { id: student.taTeacher.id },
    resolveFields: graphql`
        id
         cards: _teacherPbisCardsMeta{
         count
        }
         yearCards: _teacherPbisCardsMeta(where:{counted:false}){
         count
        }
        taTeam{
            id
        }
    `,
  });

  const updateTA = await context.lists.User.updateOne({
    id: student.taTeacher.id,
    data: { 
        PbisCardCount: taTeacher.cards.count,
        YearPbisCount: taTeacher.yearCards.count
     },
    resolveFields: false,
  });

  const totalTeamCards = await context.lists.PbisCard.findMany({
      where: {teacher:{taTeam: {id: taTeacher.taTeam.id}}},
      resolveFields: graphql`
      id
      `,
  })

  const uncountedTeamCards = await context.lists.PbisCard.findMany({
      where: {teacher:{taTeam: {id: taTeacher.taTeam.id}}, counted: false},
      resolveFields: graphql`
      id
      `,
  })
console.log(totalTeamCards)
  console.log(uncountedTeamCards)

  const updatedTeam = await context.lists.PbisTeam.updateOne({
      id: taTeacher.taTeam.id,
      data:{
          uncountedCards: uncountedTeamCards.length,
        //   countedCards: totalTeamCards.length,
      },
      resolveFields: false,
  })



    return await context.lists.User.updateOne({
        id: userId,
        data: { 
            PbisCardCount: student.cards.count,
            YearPbisCount: student.yearCards.count
         },
        resolveFields: false,
      });
}

export default recalculatePbis;