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

  const taTeam = await context.lists.PbisTeam.findOne({
    where: { id: student.taTeacher.taTeam.id },
    resolveFields: graphql`
        id
        taTeacher{
            taStudents{
                id
             cards: _studentPbisCardsMeta{
             count
            }
             yearCards: _studentPbisCardsMeta(where:{counted:false}){
             count
            }
      }
      
        }
    `,
  });

const taUncountedCardsPerTeam = taTeam.taTeacher.map((teacher) => {
    console.log(teacher)
    const cards = teacher.taStudents.reduce((sum,current)=>  sum+current.cards.count)
    console.log(cards)
    return cards
})
console.log(taUncountedCardsPerTeam)

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