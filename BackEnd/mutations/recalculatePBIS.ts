import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { Session } from '../types';
import { UserUpdateInput } from '../.keystone/schema-types';


async function recalculatePbis( root: any,
    { userId }: { userId: string },
    context: KeystoneContext
  ): Promise<UserUpdateInput> {
    console.log('Updating PBIS Count');
    console.log(userId)
    return await context.lists.User.updateOne({
        id: userId,
        data: { PbisCardCount: 666 },
        resolveFields: false,
      });
}

export default recalculatePbis;