import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { Session } from '../types';
import { UserUpdateInput } from '../.keystone/schema-types';


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
    }
        `,
      });
      console.log(student)
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