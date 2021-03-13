type Scalars = {
  readonly ID: string;
  readonly Boolean: boolean;
  readonly String: string;
  readonly Int: number;
  readonly Float: number;
  readonly JSON: import('@keystone-next/types').JSONValue;
};

export type UserRelateToManyInput = {
  readonly create?: ReadonlyArray<UserCreateInput | null> | null;
  readonly connect?: ReadonlyArray<UserWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<UserWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type UserRelateToOneInput = {
  readonly create?: UserCreateInput | null;
  readonly connect?: UserWhereUniqueInput | null;
  readonly disconnect?: UserWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type RoleRelateToManyInput = {
  readonly create?: ReadonlyArray<RoleCreateInput | null> | null;
  readonly connect?: ReadonlyArray<RoleWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<RoleWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type PbisTeamRelateToOneInput = {
  readonly create?: PbisTeamCreateInput | null;
  readonly connect?: PbisTeamWhereUniqueInput | null;
  readonly disconnect?: PbisTeamWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type StudentFocusRelateToManyInput = {
  readonly create?: ReadonlyArray<StudentFocusCreateInput | null> | null;
  readonly connect?: ReadonlyArray<StudentFocusWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<StudentFocusWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type CellPhoneViolationRelateToManyInput = {
  readonly create?: ReadonlyArray<CellPhoneViolationCreateInput | null> | null;
  readonly connect?: ReadonlyArray<CellPhoneViolationWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<CellPhoneViolationWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type PbisCardRelateToManyInput = {
  readonly create?: ReadonlyArray<PbisCardCreateInput | null> | null;
  readonly connect?: ReadonlyArray<PbisCardWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<PbisCardWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type CallbackRelateToOneInput = {
  readonly create?: CallbackCreateInput | null;
  readonly connect?: CallbackWhereUniqueInput | null;
  readonly disconnect?: CallbackWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type CallbackRelateToManyInput = {
  readonly create?: ReadonlyArray<CallbackCreateInput | null> | null;
  readonly connect?: ReadonlyArray<CallbackWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<CallbackWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type UserWhereInput = {
  readonly AND?: ReadonlyArray<UserWhereInput | null> | null;
  readonly OR?: ReadonlyArray<UserWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly email?: Scalars['String'] | null;
  readonly email_not?: Scalars['String'] | null;
  readonly email_contains?: Scalars['String'] | null;
  readonly email_not_contains?: Scalars['String'] | null;
  readonly email_starts_with?: Scalars['String'] | null;
  readonly email_not_starts_with?: Scalars['String'] | null;
  readonly email_ends_with?: Scalars['String'] | null;
  readonly email_not_ends_with?: Scalars['String'] | null;
  readonly email_i?: Scalars['String'] | null;
  readonly email_not_i?: Scalars['String'] | null;
  readonly email_contains_i?: Scalars['String'] | null;
  readonly email_not_contains_i?: Scalars['String'] | null;
  readonly email_starts_with_i?: Scalars['String'] | null;
  readonly email_not_starts_with_i?: Scalars['String'] | null;
  readonly email_ends_with_i?: Scalars['String'] | null;
  readonly email_not_ends_with_i?: Scalars['String'] | null;
  readonly email_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly email_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly password_is_set?: Scalars['Boolean'] | null;
  readonly taStudents_every?: UserWhereInput | null;
  readonly taStudents_some?: UserWhereInput | null;
  readonly taStudents_none?: UserWhereInput | null;
  readonly taTeacher?: UserWhereInput | null;
  readonly taTeacher_is_null?: Scalars['Boolean'] | null;
  readonly parent_every?: UserWhereInput | null;
  readonly parent_some?: UserWhereInput | null;
  readonly parent_none?: UserWhereInput | null;
  readonly children_every?: UserWhereInput | null;
  readonly children_some?: UserWhereInput | null;
  readonly children_none?: UserWhereInput | null;
  readonly role_every?: RoleWhereInput | null;
  readonly role_some?: RoleWhereInput | null;
  readonly role_none?: RoleWhereInput | null;
  readonly block1Teacher?: UserWhereInput | null;
  readonly block1Teacher_is_null?: Scalars['Boolean'] | null;
  readonly block1Students_every?: UserWhereInput | null;
  readonly block1Students_some?: UserWhereInput | null;
  readonly block1Students_none?: UserWhereInput | null;
  readonly block2Teacher?: UserWhereInput | null;
  readonly block2Teacher_is_null?: Scalars['Boolean'] | null;
  readonly block2Students_every?: UserWhereInput | null;
  readonly block2Students_some?: UserWhereInput | null;
  readonly block2Students_none?: UserWhereInput | null;
  readonly block3Teacher?: UserWhereInput | null;
  readonly block3Teacher_is_null?: Scalars['Boolean'] | null;
  readonly block3Students_every?: UserWhereInput | null;
  readonly block3Students_some?: UserWhereInput | null;
  readonly block3Students_none?: UserWhereInput | null;
  readonly block4Teacher?: UserWhereInput | null;
  readonly block4Teacher_is_null?: Scalars['Boolean'] | null;
  readonly block4Students_every?: UserWhereInput | null;
  readonly block4Students_some?: UserWhereInput | null;
  readonly block4Students_none?: UserWhereInput | null;
  readonly block5Teacher?: UserWhereInput | null;
  readonly block5Teacher_is_null?: Scalars['Boolean'] | null;
  readonly block5Students_every?: UserWhereInput | null;
  readonly block5Students_some?: UserWhereInput | null;
  readonly block5Students_none?: UserWhereInput | null;
  readonly taTeam?: PbisTeamWhereInput | null;
  readonly taTeam_is_null?: Scalars['Boolean'] | null;
  readonly studentFocusTeacher_every?: StudentFocusWhereInput | null;
  readonly studentFocusTeacher_some?: StudentFocusWhereInput | null;
  readonly studentFocusTeacher_none?: StudentFocusWhereInput | null;
  readonly studentFocusStudent_every?: StudentFocusWhereInput | null;
  readonly studentFocusStudent_some?: StudentFocusWhereInput | null;
  readonly studentFocusStudent_none?: StudentFocusWhereInput | null;
  readonly studentCellPhoneViolation_every?: CellPhoneViolationWhereInput | null;
  readonly studentCellPhoneViolation_some?: CellPhoneViolationWhereInput | null;
  readonly studentCellPhoneViolation_none?: CellPhoneViolationWhereInput | null;
  readonly teacherCellPhoneViolation_every?: CellPhoneViolationWhereInput | null;
  readonly teacherCellPhoneViolation_some?: CellPhoneViolationWhereInput | null;
  readonly teacherCellPhoneViolation_none?: CellPhoneViolationWhereInput | null;
  readonly teacherPbisCards_every?: PbisCardWhereInput | null;
  readonly teacherPbisCards_some?: PbisCardWhereInput | null;
  readonly teacherPbisCards_none?: PbisCardWhereInput | null;
  readonly studentPbisCards_every?: PbisCardWhereInput | null;
  readonly studentPbisCards_some?: PbisCardWhereInput | null;
  readonly studentPbisCards_none?: PbisCardWhereInput | null;
  readonly callbackItems?: CallbackWhereInput | null;
  readonly callbackItems_is_null?: Scalars['Boolean'] | null;
  readonly callbackAssigned_every?: CallbackWhereInput | null;
  readonly callbackAssigned_some?: CallbackWhereInput | null;
  readonly callbackAssigned_none?: CallbackWhereInput | null;
  readonly callbackCount?: Scalars['Int'] | null;
  readonly callbackCount_not?: Scalars['Int'] | null;
  readonly callbackCount_lt?: Scalars['Int'] | null;
  readonly callbackCount_lte?: Scalars['Int'] | null;
  readonly callbackCount_gt?: Scalars['Int'] | null;
  readonly callbackCount_gte?: Scalars['Int'] | null;
  readonly callbackCount_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly callbackCount_not_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly PbisCardCount?: Scalars['Int'] | null;
  readonly PbisCardCount_not?: Scalars['Int'] | null;
  readonly PbisCardCount_lt?: Scalars['Int'] | null;
  readonly PbisCardCount_lte?: Scalars['Int'] | null;
  readonly PbisCardCount_gt?: Scalars['Int'] | null;
  readonly PbisCardCount_gte?: Scalars['Int'] | null;
  readonly PbisCardCount_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly PbisCardCount_not_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly YearPbisCount?: Scalars['Int'] | null;
  readonly YearPbisCount_not?: Scalars['Int'] | null;
  readonly YearPbisCount_lt?: Scalars['Int'] | null;
  readonly YearPbisCount_lte?: Scalars['Int'] | null;
  readonly YearPbisCount_gt?: Scalars['Int'] | null;
  readonly YearPbisCount_gte?: Scalars['Int'] | null;
  readonly YearPbisCount_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly YearPbisCount_not_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly teacherSubject?: Scalars['String'] | null;
  readonly teacherSubject_not?: Scalars['String'] | null;
  readonly teacherSubject_contains?: Scalars['String'] | null;
  readonly teacherSubject_not_contains?: Scalars['String'] | null;
  readonly teacherSubject_starts_with?: Scalars['String'] | null;
  readonly teacherSubject_not_starts_with?: Scalars['String'] | null;
  readonly teacherSubject_ends_with?: Scalars['String'] | null;
  readonly teacherSubject_not_ends_with?: Scalars['String'] | null;
  readonly teacherSubject_i?: Scalars['String'] | null;
  readonly teacherSubject_not_i?: Scalars['String'] | null;
  readonly teacherSubject_contains_i?: Scalars['String'] | null;
  readonly teacherSubject_not_contains_i?: Scalars['String'] | null;
  readonly teacherSubject_starts_with_i?: Scalars['String'] | null;
  readonly teacherSubject_not_starts_with_i?: Scalars['String'] | null;
  readonly teacherSubject_ends_with_i?: Scalars['String'] | null;
  readonly teacherSubject_not_ends_with_i?: Scalars['String'] | null;
  readonly teacherSubject_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly teacherSubject_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly taPbisCardCount?: Scalars['Int'] | null;
  readonly taPbisCardCount_not?: Scalars['Int'] | null;
  readonly taPbisCardCount_lt?: Scalars['Int'] | null;
  readonly taPbisCardCount_lte?: Scalars['Int'] | null;
  readonly taPbisCardCount_gt?: Scalars['Int'] | null;
  readonly taPbisCardCount_gte?: Scalars['Int'] | null;
  readonly taPbisCardCount_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly taPbisCardCount_not_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly averageTimeToCompleteCallback?: Scalars['Int'] | null;
  readonly averageTimeToCompleteCallback_not?: Scalars['Int'] | null;
  readonly averageTimeToCompleteCallback_lt?: Scalars['Int'] | null;
  readonly averageTimeToCompleteCallback_lte?: Scalars['Int'] | null;
  readonly averageTimeToCompleteCallback_gt?: Scalars['Int'] | null;
  readonly averageTimeToCompleteCallback_gte?: Scalars['Int'] | null;
  readonly averageTimeToCompleteCallback_in?: ReadonlyArray<
    Scalars['Int'] | null
  > | null;
  readonly averageTimeToCompleteCallback_not_in?: ReadonlyArray<
    Scalars['Int'] | null
  > | null;
  readonly block1Assignment?: Scalars['String'] | null;
  readonly block1Assignment_not?: Scalars['String'] | null;
  readonly block1Assignment_contains?: Scalars['String'] | null;
  readonly block1Assignment_not_contains?: Scalars['String'] | null;
  readonly block1Assignment_starts_with?: Scalars['String'] | null;
  readonly block1Assignment_not_starts_with?: Scalars['String'] | null;
  readonly block1Assignment_ends_with?: Scalars['String'] | null;
  readonly block1Assignment_not_ends_with?: Scalars['String'] | null;
  readonly block1Assignment_i?: Scalars['String'] | null;
  readonly block1Assignment_not_i?: Scalars['String'] | null;
  readonly block1Assignment_contains_i?: Scalars['String'] | null;
  readonly block1Assignment_not_contains_i?: Scalars['String'] | null;
  readonly block1Assignment_starts_with_i?: Scalars['String'] | null;
  readonly block1Assignment_not_starts_with_i?: Scalars['String'] | null;
  readonly block1Assignment_ends_with_i?: Scalars['String'] | null;
  readonly block1Assignment_not_ends_with_i?: Scalars['String'] | null;
  readonly block1Assignment_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly block1Assignment_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly block1AssignmentLastUpdated?: Scalars['String'] | null;
  readonly block1AssignmentLastUpdated_not?: Scalars['String'] | null;
  readonly block1AssignmentLastUpdated_lt?: Scalars['String'] | null;
  readonly block1AssignmentLastUpdated_lte?: Scalars['String'] | null;
  readonly block1AssignmentLastUpdated_gt?: Scalars['String'] | null;
  readonly block1AssignmentLastUpdated_gte?: Scalars['String'] | null;
  readonly block1AssignmentLastUpdated_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly block1AssignmentLastUpdated_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly block2Assignment?: Scalars['String'] | null;
  readonly block2Assignment_not?: Scalars['String'] | null;
  readonly block2Assignment_contains?: Scalars['String'] | null;
  readonly block2Assignment_not_contains?: Scalars['String'] | null;
  readonly block2Assignment_starts_with?: Scalars['String'] | null;
  readonly block2Assignment_not_starts_with?: Scalars['String'] | null;
  readonly block2Assignment_ends_with?: Scalars['String'] | null;
  readonly block2Assignment_not_ends_with?: Scalars['String'] | null;
  readonly block2Assignment_i?: Scalars['String'] | null;
  readonly block2Assignment_not_i?: Scalars['String'] | null;
  readonly block2Assignment_contains_i?: Scalars['String'] | null;
  readonly block2Assignment_not_contains_i?: Scalars['String'] | null;
  readonly block2Assignment_starts_with_i?: Scalars['String'] | null;
  readonly block2Assignment_not_starts_with_i?: Scalars['String'] | null;
  readonly block2Assignment_ends_with_i?: Scalars['String'] | null;
  readonly block2Assignment_not_ends_with_i?: Scalars['String'] | null;
  readonly block2Assignment_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly block2Assignment_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly block3Assignment?: Scalars['String'] | null;
  readonly block3Assignment_not?: Scalars['String'] | null;
  readonly block3Assignment_contains?: Scalars['String'] | null;
  readonly block3Assignment_not_contains?: Scalars['String'] | null;
  readonly block3Assignment_starts_with?: Scalars['String'] | null;
  readonly block3Assignment_not_starts_with?: Scalars['String'] | null;
  readonly block3Assignment_ends_with?: Scalars['String'] | null;
  readonly block3Assignment_not_ends_with?: Scalars['String'] | null;
  readonly block3Assignment_i?: Scalars['String'] | null;
  readonly block3Assignment_not_i?: Scalars['String'] | null;
  readonly block3Assignment_contains_i?: Scalars['String'] | null;
  readonly block3Assignment_not_contains_i?: Scalars['String'] | null;
  readonly block3Assignment_starts_with_i?: Scalars['String'] | null;
  readonly block3Assignment_not_starts_with_i?: Scalars['String'] | null;
  readonly block3Assignment_ends_with_i?: Scalars['String'] | null;
  readonly block3Assignment_not_ends_with_i?: Scalars['String'] | null;
  readonly block3Assignment_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly block3Assignment_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly block4Assignment?: Scalars['String'] | null;
  readonly block4Assignment_not?: Scalars['String'] | null;
  readonly block4Assignment_contains?: Scalars['String'] | null;
  readonly block4Assignment_not_contains?: Scalars['String'] | null;
  readonly block4Assignment_starts_with?: Scalars['String'] | null;
  readonly block4Assignment_not_starts_with?: Scalars['String'] | null;
  readonly block4Assignment_ends_with?: Scalars['String'] | null;
  readonly block4Assignment_not_ends_with?: Scalars['String'] | null;
  readonly block4Assignment_i?: Scalars['String'] | null;
  readonly block4Assignment_not_i?: Scalars['String'] | null;
  readonly block4Assignment_contains_i?: Scalars['String'] | null;
  readonly block4Assignment_not_contains_i?: Scalars['String'] | null;
  readonly block4Assignment_starts_with_i?: Scalars['String'] | null;
  readonly block4Assignment_not_starts_with_i?: Scalars['String'] | null;
  readonly block4Assignment_ends_with_i?: Scalars['String'] | null;
  readonly block4Assignment_not_ends_with_i?: Scalars['String'] | null;
  readonly block4Assignment_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly block4Assignment_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly block5Assignment?: Scalars['String'] | null;
  readonly block5Assignment_not?: Scalars['String'] | null;
  readonly block5Assignment_contains?: Scalars['String'] | null;
  readonly block5Assignment_not_contains?: Scalars['String'] | null;
  readonly block5Assignment_starts_with?: Scalars['String'] | null;
  readonly block5Assignment_not_starts_with?: Scalars['String'] | null;
  readonly block5Assignment_ends_with?: Scalars['String'] | null;
  readonly block5Assignment_not_ends_with?: Scalars['String'] | null;
  readonly block5Assignment_i?: Scalars['String'] | null;
  readonly block5Assignment_not_i?: Scalars['String'] | null;
  readonly block5Assignment_contains_i?: Scalars['String'] | null;
  readonly block5Assignment_not_contains_i?: Scalars['String'] | null;
  readonly block5Assignment_starts_with_i?: Scalars['String'] | null;
  readonly block5Assignment_not_starts_with_i?: Scalars['String'] | null;
  readonly block5Assignment_ends_with_i?: Scalars['String'] | null;
  readonly block5Assignment_not_ends_with_i?: Scalars['String'] | null;
  readonly block5Assignment_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly block5Assignment_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetToken_is_set?: Scalars['Boolean'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_not?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_lt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_lte?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_gt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_gte?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetIssuedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_not?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_lt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_lte?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_gt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_gte?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetRedeemedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthToken_is_set?: Scalars['Boolean'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_not?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_lt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_lte?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_gt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_gte?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthIssuedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_not?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_lt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_lte?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_gt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_gte?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthRedeemedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
};

export type UserWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortUsersBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'email_ASC'
  | 'email_DESC'
  | 'taStudents_ASC'
  | 'taStudents_DESC'
  | 'taTeacher_ASC'
  | 'taTeacher_DESC'
  | 'parent_ASC'
  | 'parent_DESC'
  | 'children_ASC'
  | 'children_DESC'
  | 'role_ASC'
  | 'role_DESC'
  | 'block1Teacher_ASC'
  | 'block1Teacher_DESC'
  | 'block1Students_ASC'
  | 'block1Students_DESC'
  | 'block2Teacher_ASC'
  | 'block2Teacher_DESC'
  | 'block2Students_ASC'
  | 'block2Students_DESC'
  | 'block3Teacher_ASC'
  | 'block3Teacher_DESC'
  | 'block3Students_ASC'
  | 'block3Students_DESC'
  | 'block4Teacher_ASC'
  | 'block4Teacher_DESC'
  | 'block4Students_ASC'
  | 'block4Students_DESC'
  | 'block5Teacher_ASC'
  | 'block5Teacher_DESC'
  | 'block5Students_ASC'
  | 'block5Students_DESC'
  | 'taTeam_ASC'
  | 'taTeam_DESC'
  | 'studentFocusTeacher_ASC'
  | 'studentFocusTeacher_DESC'
  | 'studentFocusStudent_ASC'
  | 'studentFocusStudent_DESC'
  | 'studentCellPhoneViolation_ASC'
  | 'studentCellPhoneViolation_DESC'
  | 'teacherCellPhoneViolation_ASC'
  | 'teacherCellPhoneViolation_DESC'
  | 'teacherPbisCards_ASC'
  | 'teacherPbisCards_DESC'
  | 'studentPbisCards_ASC'
  | 'studentPbisCards_DESC'
  | 'callbackItems_ASC'
  | 'callbackItems_DESC'
  | 'callbackAssigned_ASC'
  | 'callbackAssigned_DESC'
  | 'callbackCount_ASC'
  | 'callbackCount_DESC'
  | 'PbisCardCount_ASC'
  | 'PbisCardCount_DESC'
  | 'YearPbisCount_ASC'
  | 'YearPbisCount_DESC'
  | 'teacherSubject_ASC'
  | 'teacherSubject_DESC'
  | 'taPbisCardCount_ASC'
  | 'taPbisCardCount_DESC'
  | 'averageTimeToCompleteCallback_ASC'
  | 'averageTimeToCompleteCallback_DESC'
  | 'block1Assignment_ASC'
  | 'block1Assignment_DESC'
  | 'block1AssignmentLastUpdated_ASC'
  | 'block1AssignmentLastUpdated_DESC'
  | 'block2Assignment_ASC'
  | 'block2Assignment_DESC'
  | 'block3Assignment_ASC'
  | 'block3Assignment_DESC'
  | 'block4Assignment_ASC'
  | 'block4Assignment_DESC'
  | 'block5Assignment_ASC'
  | 'block5Assignment_DESC'
  | 'passwordResetIssuedAt_ASC'
  | 'passwordResetIssuedAt_DESC'
  | 'passwordResetRedeemedAt_ASC'
  | 'passwordResetRedeemedAt_DESC'
  | 'magicAuthIssuedAt_ASC'
  | 'magicAuthIssuedAt_DESC'
  | 'magicAuthRedeemedAt_ASC'
  | 'magicAuthRedeemedAt_DESC';

export type UserUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
  readonly taStudents?: UserRelateToManyInput | null;
  readonly taTeacher?: UserRelateToOneInput | null;
  readonly parent?: UserRelateToManyInput | null;
  readonly children?: UserRelateToManyInput | null;
  readonly role?: RoleRelateToManyInput | null;
  readonly block1Teacher?: UserRelateToOneInput | null;
  readonly block1Students?: UserRelateToManyInput | null;
  readonly block2Teacher?: UserRelateToOneInput | null;
  readonly block2Students?: UserRelateToManyInput | null;
  readonly block3Teacher?: UserRelateToOneInput | null;
  readonly block3Students?: UserRelateToManyInput | null;
  readonly block4Teacher?: UserRelateToOneInput | null;
  readonly block4Students?: UserRelateToManyInput | null;
  readonly block5Teacher?: UserRelateToOneInput | null;
  readonly block5Students?: UserRelateToManyInput | null;
  readonly taTeam?: PbisTeamRelateToOneInput | null;
  readonly studentFocusTeacher?: StudentFocusRelateToManyInput | null;
  readonly studentFocusStudent?: StudentFocusRelateToManyInput | null;
  readonly studentCellPhoneViolation?: CellPhoneViolationRelateToManyInput | null;
  readonly teacherCellPhoneViolation?: CellPhoneViolationRelateToManyInput | null;
  readonly teacherPbisCards?: PbisCardRelateToManyInput | null;
  readonly studentPbisCards?: PbisCardRelateToManyInput | null;
  readonly callbackItems?: CallbackRelateToOneInput | null;
  readonly callbackAssigned?: CallbackRelateToManyInput | null;
  readonly callbackCount?: Scalars['Int'] | null;
  readonly PbisCardCount?: Scalars['Int'] | null;
  readonly YearPbisCount?: Scalars['Int'] | null;
  readonly teacherSubject?: Scalars['String'] | null;
  readonly taPbisCardCount?: Scalars['Int'] | null;
  readonly averageTimeToCompleteCallback?: Scalars['Int'] | null;
  readonly block1Assignment?: Scalars['String'] | null;
  readonly block1AssignmentLastUpdated?: Scalars['String'] | null;
  readonly block2Assignment?: Scalars['String'] | null;
  readonly block3Assignment?: Scalars['String'] | null;
  readonly block4Assignment?: Scalars['String'] | null;
  readonly block5Assignment?: Scalars['String'] | null;
  readonly passwordResetToken?: Scalars['String'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthToken?: Scalars['String'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
};

export type UsersUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: UserUpdateInput | null;
};

export type UserCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
  readonly taStudents?: UserRelateToManyInput | null;
  readonly taTeacher?: UserRelateToOneInput | null;
  readonly parent?: UserRelateToManyInput | null;
  readonly children?: UserRelateToManyInput | null;
  readonly role?: RoleRelateToManyInput | null;
  readonly block1Teacher?: UserRelateToOneInput | null;
  readonly block1Students?: UserRelateToManyInput | null;
  readonly block2Teacher?: UserRelateToOneInput | null;
  readonly block2Students?: UserRelateToManyInput | null;
  readonly block3Teacher?: UserRelateToOneInput | null;
  readonly block3Students?: UserRelateToManyInput | null;
  readonly block4Teacher?: UserRelateToOneInput | null;
  readonly block4Students?: UserRelateToManyInput | null;
  readonly block5Teacher?: UserRelateToOneInput | null;
  readonly block5Students?: UserRelateToManyInput | null;
  readonly taTeam?: PbisTeamRelateToOneInput | null;
  readonly studentFocusTeacher?: StudentFocusRelateToManyInput | null;
  readonly studentFocusStudent?: StudentFocusRelateToManyInput | null;
  readonly studentCellPhoneViolation?: CellPhoneViolationRelateToManyInput | null;
  readonly teacherCellPhoneViolation?: CellPhoneViolationRelateToManyInput | null;
  readonly teacherPbisCards?: PbisCardRelateToManyInput | null;
  readonly studentPbisCards?: PbisCardRelateToManyInput | null;
  readonly callbackItems?: CallbackRelateToOneInput | null;
  readonly callbackAssigned?: CallbackRelateToManyInput | null;
  readonly callbackCount?: Scalars['Int'] | null;
  readonly PbisCardCount?: Scalars['Int'] | null;
  readonly YearPbisCount?: Scalars['Int'] | null;
  readonly teacherSubject?: Scalars['String'] | null;
  readonly taPbisCardCount?: Scalars['Int'] | null;
  readonly averageTimeToCompleteCallback?: Scalars['Int'] | null;
  readonly block1Assignment?: Scalars['String'] | null;
  readonly block1AssignmentLastUpdated?: Scalars['String'] | null;
  readonly block2Assignment?: Scalars['String'] | null;
  readonly block3Assignment?: Scalars['String'] | null;
  readonly block4Assignment?: Scalars['String'] | null;
  readonly block5Assignment?: Scalars['String'] | null;
  readonly passwordResetToken?: Scalars['String'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthToken?: Scalars['String'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
};

export type UsersCreateInput = {
  readonly data?: UserCreateInput | null;
};

export type CalendarWhereInput = {
  readonly AND?: ReadonlyArray<CalendarWhereInput | null> | null;
  readonly OR?: ReadonlyArray<CalendarWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description?: Scalars['String'] | null;
  readonly description_not?: Scalars['String'] | null;
  readonly description_contains?: Scalars['String'] | null;
  readonly description_not_contains?: Scalars['String'] | null;
  readonly description_starts_with?: Scalars['String'] | null;
  readonly description_not_starts_with?: Scalars['String'] | null;
  readonly description_ends_with?: Scalars['String'] | null;
  readonly description_not_ends_with?: Scalars['String'] | null;
  readonly description_i?: Scalars['String'] | null;
  readonly description_not_i?: Scalars['String'] | null;
  readonly description_contains_i?: Scalars['String'] | null;
  readonly description_not_contains_i?: Scalars['String'] | null;
  readonly description_starts_with_i?: Scalars['String'] | null;
  readonly description_not_starts_with_i?: Scalars['String'] | null;
  readonly description_ends_with_i?: Scalars['String'] | null;
  readonly description_not_ends_with_i?: Scalars['String'] | null;
  readonly description_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly status?: Scalars['String'] | null;
  readonly status_not?: Scalars['String'] | null;
  readonly status_contains?: Scalars['String'] | null;
  readonly status_not_contains?: Scalars['String'] | null;
  readonly status_starts_with?: Scalars['String'] | null;
  readonly status_not_starts_with?: Scalars['String'] | null;
  readonly status_ends_with?: Scalars['String'] | null;
  readonly status_not_ends_with?: Scalars['String'] | null;
  readonly status_i?: Scalars['String'] | null;
  readonly status_not_i?: Scalars['String'] | null;
  readonly status_contains_i?: Scalars['String'] | null;
  readonly status_not_contains_i?: Scalars['String'] | null;
  readonly status_starts_with_i?: Scalars['String'] | null;
  readonly status_not_starts_with_i?: Scalars['String'] | null;
  readonly status_ends_with_i?: Scalars['String'] | null;
  readonly status_not_ends_with_i?: Scalars['String'] | null;
  readonly status_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly status_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly date?: Scalars['String'] | null;
  readonly date_not?: Scalars['String'] | null;
  readonly date_lt?: Scalars['String'] | null;
  readonly date_lte?: Scalars['String'] | null;
  readonly date_gt?: Scalars['String'] | null;
  readonly date_gte?: Scalars['String'] | null;
  readonly date_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly date_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly author?: UserWhereInput | null;
  readonly author_is_null?: Scalars['Boolean'] | null;
  readonly dateCreated?: Scalars['String'] | null;
  readonly dateCreated_not?: Scalars['String'] | null;
  readonly dateCreated_lt?: Scalars['String'] | null;
  readonly dateCreated_lte?: Scalars['String'] | null;
  readonly dateCreated_gt?: Scalars['String'] | null;
  readonly dateCreated_gte?: Scalars['String'] | null;
  readonly dateCreated_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly dateCreated_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly link?: Scalars['String'] | null;
  readonly link_not?: Scalars['String'] | null;
  readonly link_contains?: Scalars['String'] | null;
  readonly link_not_contains?: Scalars['String'] | null;
  readonly link_starts_with?: Scalars['String'] | null;
  readonly link_not_starts_with?: Scalars['String'] | null;
  readonly link_ends_with?: Scalars['String'] | null;
  readonly link_not_ends_with?: Scalars['String'] | null;
  readonly link_i?: Scalars['String'] | null;
  readonly link_not_i?: Scalars['String'] | null;
  readonly link_contains_i?: Scalars['String'] | null;
  readonly link_not_contains_i?: Scalars['String'] | null;
  readonly link_starts_with_i?: Scalars['String'] | null;
  readonly link_not_starts_with_i?: Scalars['String'] | null;
  readonly link_ends_with_i?: Scalars['String'] | null;
  readonly link_not_ends_with_i?: Scalars['String'] | null;
  readonly link_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly link_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly linkTitle?: Scalars['String'] | null;
  readonly linkTitle_not?: Scalars['String'] | null;
  readonly linkTitle_contains?: Scalars['String'] | null;
  readonly linkTitle_not_contains?: Scalars['String'] | null;
  readonly linkTitle_starts_with?: Scalars['String'] | null;
  readonly linkTitle_not_starts_with?: Scalars['String'] | null;
  readonly linkTitle_ends_with?: Scalars['String'] | null;
  readonly linkTitle_not_ends_with?: Scalars['String'] | null;
  readonly linkTitle_i?: Scalars['String'] | null;
  readonly linkTitle_not_i?: Scalars['String'] | null;
  readonly linkTitle_contains_i?: Scalars['String'] | null;
  readonly linkTitle_not_contains_i?: Scalars['String'] | null;
  readonly linkTitle_starts_with_i?: Scalars['String'] | null;
  readonly linkTitle_not_starts_with_i?: Scalars['String'] | null;
  readonly linkTitle_ends_with_i?: Scalars['String'] | null;
  readonly linkTitle_not_ends_with_i?: Scalars['String'] | null;
  readonly linkTitle_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly linkTitle_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
};

export type CalendarWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortCalendarsBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'status_ASC'
  | 'status_DESC'
  | 'date_ASC'
  | 'date_DESC'
  | 'author_ASC'
  | 'author_DESC'
  | 'dateCreated_ASC'
  | 'dateCreated_DESC'
  | 'link_ASC'
  | 'link_DESC'
  | 'linkTitle_ASC'
  | 'linkTitle_DESC';

export type CalendarUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly description?: Scalars['String'] | null;
  readonly status?: Scalars['String'] | null;
  readonly date?: Scalars['String'] | null;
  readonly author?: UserRelateToOneInput | null;
  readonly dateCreated?: Scalars['String'] | null;
  readonly link?: Scalars['String'] | null;
  readonly linkTitle?: Scalars['String'] | null;
};

export type CalendarsUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: CalendarUpdateInput | null;
};

export type CalendarCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly description?: Scalars['String'] | null;
  readonly status?: Scalars['String'] | null;
  readonly date?: Scalars['String'] | null;
  readonly author?: UserRelateToOneInput | null;
  readonly dateCreated?: Scalars['String'] | null;
  readonly link?: Scalars['String'] | null;
  readonly linkTitle?: Scalars['String'] | null;
};

export type CalendarsCreateInput = {
  readonly data?: CalendarCreateInput | null;
};

export type RoleWhereInput = {
  readonly AND?: ReadonlyArray<RoleWhereInput | null> | null;
  readonly OR?: ReadonlyArray<RoleWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly canManageCalendar?: Scalars['Boolean'] | null;
  readonly canManageCalendar_not?: Scalars['Boolean'] | null;
  readonly canSeeOtherUsers?: Scalars['Boolean'] | null;
  readonly canSeeOtherUsers_not?: Scalars['Boolean'] | null;
  readonly canManageUsers?: Scalars['Boolean'] | null;
  readonly canManageUsers_not?: Scalars['Boolean'] | null;
  readonly canManageRoles?: Scalars['Boolean'] | null;
  readonly canManageRoles_not?: Scalars['Boolean'] | null;
  readonly canManageLinks?: Scalars['Boolean'] | null;
  readonly canManageLinks_not?: Scalars['Boolean'] | null;
  readonly canManageDiscipline?: Scalars['Boolean'] | null;
  readonly canManageDiscipline_not?: Scalars['Boolean'] | null;
  readonly canSeeAllDiscipline?: Scalars['Boolean'] | null;
  readonly canSeeAllDiscipline_not?: Scalars['Boolean'] | null;
  readonly canSeeAllTeacherEvents?: Scalars['Boolean'] | null;
  readonly canSeeAllTeacherEvents_not?: Scalars['Boolean'] | null;
  readonly canSeeStudentEvents?: Scalars['Boolean'] | null;
  readonly canSeeStudentEvents_not?: Scalars['Boolean'] | null;
  readonly canSeeOwnCallback?: Scalars['Boolean'] | null;
  readonly canSeeOwnCallback_not?: Scalars['Boolean'] | null;
  readonly canSeeAllCallback?: Scalars['Boolean'] | null;
  readonly canSeeAllCallback_not?: Scalars['Boolean'] | null;
  readonly hasTA?: Scalars['Boolean'] | null;
  readonly hasTA_not?: Scalars['Boolean'] | null;
  readonly hasClasses?: Scalars['Boolean'] | null;
  readonly hasClasses_not?: Scalars['Boolean'] | null;
  readonly assignedTo_every?: UserWhereInput | null;
  readonly assignedTo_some?: UserWhereInput | null;
  readonly assignedTo_none?: UserWhereInput | null;
};

export type RoleWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortRolesBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'canManageCalendar_ASC'
  | 'canManageCalendar_DESC'
  | 'canSeeOtherUsers_ASC'
  | 'canSeeOtherUsers_DESC'
  | 'canManageUsers_ASC'
  | 'canManageUsers_DESC'
  | 'canManageRoles_ASC'
  | 'canManageRoles_DESC'
  | 'canManageLinks_ASC'
  | 'canManageLinks_DESC'
  | 'canManageDiscipline_ASC'
  | 'canManageDiscipline_DESC'
  | 'canSeeAllDiscipline_ASC'
  | 'canSeeAllDiscipline_DESC'
  | 'canSeeAllTeacherEvents_ASC'
  | 'canSeeAllTeacherEvents_DESC'
  | 'canSeeStudentEvents_ASC'
  | 'canSeeStudentEvents_DESC'
  | 'canSeeOwnCallback_ASC'
  | 'canSeeOwnCallback_DESC'
  | 'canSeeAllCallback_ASC'
  | 'canSeeAllCallback_DESC'
  | 'hasTA_ASC'
  | 'hasTA_DESC'
  | 'hasClasses_ASC'
  | 'hasClasses_DESC'
  | 'assignedTo_ASC'
  | 'assignedTo_DESC';

export type RoleUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly canManageCalendar?: Scalars['Boolean'] | null;
  readonly canSeeOtherUsers?: Scalars['Boolean'] | null;
  readonly canManageUsers?: Scalars['Boolean'] | null;
  readonly canManageRoles?: Scalars['Boolean'] | null;
  readonly canManageLinks?: Scalars['Boolean'] | null;
  readonly canManageDiscipline?: Scalars['Boolean'] | null;
  readonly canSeeAllDiscipline?: Scalars['Boolean'] | null;
  readonly canSeeAllTeacherEvents?: Scalars['Boolean'] | null;
  readonly canSeeStudentEvents?: Scalars['Boolean'] | null;
  readonly canSeeOwnCallback?: Scalars['Boolean'] | null;
  readonly canSeeAllCallback?: Scalars['Boolean'] | null;
  readonly hasTA?: Scalars['Boolean'] | null;
  readonly hasClasses?: Scalars['Boolean'] | null;
  readonly assignedTo?: UserRelateToManyInput | null;
};

export type RolesUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: RoleUpdateInput | null;
};

export type RoleCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly canManageCalendar?: Scalars['Boolean'] | null;
  readonly canSeeOtherUsers?: Scalars['Boolean'] | null;
  readonly canManageUsers?: Scalars['Boolean'] | null;
  readonly canManageRoles?: Scalars['Boolean'] | null;
  readonly canManageLinks?: Scalars['Boolean'] | null;
  readonly canManageDiscipline?: Scalars['Boolean'] | null;
  readonly canSeeAllDiscipline?: Scalars['Boolean'] | null;
  readonly canSeeAllTeacherEvents?: Scalars['Boolean'] | null;
  readonly canSeeStudentEvents?: Scalars['Boolean'] | null;
  readonly canSeeOwnCallback?: Scalars['Boolean'] | null;
  readonly canSeeAllCallback?: Scalars['Boolean'] | null;
  readonly hasTA?: Scalars['Boolean'] | null;
  readonly hasClasses?: Scalars['Boolean'] | null;
  readonly assignedTo?: UserRelateToManyInput | null;
};

export type RolesCreateInput = {
  readonly data?: RoleCreateInput | null;
};

export type LinkWhereInput = {
  readonly AND?: ReadonlyArray<LinkWhereInput | null> | null;
  readonly OR?: ReadonlyArray<LinkWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description?: Scalars['String'] | null;
  readonly description_not?: Scalars['String'] | null;
  readonly description_contains?: Scalars['String'] | null;
  readonly description_not_contains?: Scalars['String'] | null;
  readonly description_starts_with?: Scalars['String'] | null;
  readonly description_not_starts_with?: Scalars['String'] | null;
  readonly description_ends_with?: Scalars['String'] | null;
  readonly description_not_ends_with?: Scalars['String'] | null;
  readonly description_i?: Scalars['String'] | null;
  readonly description_not_i?: Scalars['String'] | null;
  readonly description_contains_i?: Scalars['String'] | null;
  readonly description_not_contains_i?: Scalars['String'] | null;
  readonly description_starts_with_i?: Scalars['String'] | null;
  readonly description_not_starts_with_i?: Scalars['String'] | null;
  readonly description_ends_with_i?: Scalars['String'] | null;
  readonly description_not_ends_with_i?: Scalars['String'] | null;
  readonly description_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly forTeachers?: Scalars['Boolean'] | null;
  readonly forTeachers_not?: Scalars['Boolean'] | null;
  readonly forStudents?: Scalars['Boolean'] | null;
  readonly forStudents_not?: Scalars['Boolean'] | null;
  readonly forParents?: Scalars['Boolean'] | null;
  readonly forParents_not?: Scalars['Boolean'] | null;
  readonly onHomePage?: Scalars['Boolean'] | null;
  readonly onHomePage_not?: Scalars['Boolean'] | null;
  readonly modifiedBy?: UserWhereInput | null;
  readonly modifiedBy_is_null?: Scalars['Boolean'] | null;
  readonly modified?: Scalars['String'] | null;
  readonly modified_not?: Scalars['String'] | null;
  readonly modified_lt?: Scalars['String'] | null;
  readonly modified_lte?: Scalars['String'] | null;
  readonly modified_gt?: Scalars['String'] | null;
  readonly modified_gte?: Scalars['String'] | null;
  readonly modified_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly modified_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly link?: Scalars['String'] | null;
  readonly link_not?: Scalars['String'] | null;
  readonly link_contains?: Scalars['String'] | null;
  readonly link_not_contains?: Scalars['String'] | null;
  readonly link_starts_with?: Scalars['String'] | null;
  readonly link_not_starts_with?: Scalars['String'] | null;
  readonly link_ends_with?: Scalars['String'] | null;
  readonly link_not_ends_with?: Scalars['String'] | null;
  readonly link_i?: Scalars['String'] | null;
  readonly link_not_i?: Scalars['String'] | null;
  readonly link_contains_i?: Scalars['String'] | null;
  readonly link_not_contains_i?: Scalars['String'] | null;
  readonly link_starts_with_i?: Scalars['String'] | null;
  readonly link_not_starts_with_i?: Scalars['String'] | null;
  readonly link_ends_with_i?: Scalars['String'] | null;
  readonly link_not_ends_with_i?: Scalars['String'] | null;
  readonly link_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly link_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
};

export type LinkWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortLinksBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'forTeachers_ASC'
  | 'forTeachers_DESC'
  | 'forStudents_ASC'
  | 'forStudents_DESC'
  | 'forParents_ASC'
  | 'forParents_DESC'
  | 'onHomePage_ASC'
  | 'onHomePage_DESC'
  | 'modifiedBy_ASC'
  | 'modifiedBy_DESC'
  | 'modified_ASC'
  | 'modified_DESC'
  | 'link_ASC'
  | 'link_DESC';

export type LinkUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly description?: Scalars['String'] | null;
  readonly forTeachers?: Scalars['Boolean'] | null;
  readonly forStudents?: Scalars['Boolean'] | null;
  readonly forParents?: Scalars['Boolean'] | null;
  readonly onHomePage?: Scalars['Boolean'] | null;
  readonly modifiedBy?: UserRelateToOneInput | null;
  readonly modified?: Scalars['String'] | null;
  readonly link?: Scalars['String'] | null;
};

export type LinksUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: LinkUpdateInput | null;
};

export type LinkCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly description?: Scalars['String'] | null;
  readonly forTeachers?: Scalars['Boolean'] | null;
  readonly forStudents?: Scalars['Boolean'] | null;
  readonly forParents?: Scalars['Boolean'] | null;
  readonly onHomePage?: Scalars['Boolean'] | null;
  readonly modifiedBy?: UserRelateToOneInput | null;
  readonly modified?: Scalars['String'] | null;
  readonly link?: Scalars['String'] | null;
};

export type LinksCreateInput = {
  readonly data?: LinkCreateInput | null;
};

export type PbisCardWhereInput = {
  readonly AND?: ReadonlyArray<PbisCardWhereInput | null> | null;
  readonly OR?: ReadonlyArray<PbisCardWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly cardMessage?: Scalars['String'] | null;
  readonly cardMessage_not?: Scalars['String'] | null;
  readonly cardMessage_contains?: Scalars['String'] | null;
  readonly cardMessage_not_contains?: Scalars['String'] | null;
  readonly cardMessage_starts_with?: Scalars['String'] | null;
  readonly cardMessage_not_starts_with?: Scalars['String'] | null;
  readonly cardMessage_ends_with?: Scalars['String'] | null;
  readonly cardMessage_not_ends_with?: Scalars['String'] | null;
  readonly cardMessage_i?: Scalars['String'] | null;
  readonly cardMessage_not_i?: Scalars['String'] | null;
  readonly cardMessage_contains_i?: Scalars['String'] | null;
  readonly cardMessage_not_contains_i?: Scalars['String'] | null;
  readonly cardMessage_starts_with_i?: Scalars['String'] | null;
  readonly cardMessage_not_starts_with_i?: Scalars['String'] | null;
  readonly cardMessage_ends_with_i?: Scalars['String'] | null;
  readonly cardMessage_not_ends_with_i?: Scalars['String'] | null;
  readonly cardMessage_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly cardMessage_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly student?: UserWhereInput | null;
  readonly student_is_null?: Scalars['Boolean'] | null;
  readonly teacher?: UserWhereInput | null;
  readonly teacher_is_null?: Scalars['Boolean'] | null;
  readonly dateGiven?: Scalars['String'] | null;
  readonly dateGiven_not?: Scalars['String'] | null;
  readonly dateGiven_lt?: Scalars['String'] | null;
  readonly dateGiven_lte?: Scalars['String'] | null;
  readonly dateGiven_gt?: Scalars['String'] | null;
  readonly dateGiven_gte?: Scalars['String'] | null;
  readonly dateGiven_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly dateGiven_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly counted?: Scalars['Boolean'] | null;
  readonly counted_not?: Scalars['Boolean'] | null;
};

export type PbisCardWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortPbisCardsBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'cardMessage_ASC'
  | 'cardMessage_DESC'
  | 'student_ASC'
  | 'student_DESC'
  | 'teacher_ASC'
  | 'teacher_DESC'
  | 'dateGiven_ASC'
  | 'dateGiven_DESC'
  | 'counted_ASC'
  | 'counted_DESC';

export type PbisCardUpdateInput = {
  readonly cardMessage?: Scalars['String'] | null;
  readonly student?: UserRelateToOneInput | null;
  readonly teacher?: UserRelateToOneInput | null;
  readonly dateGiven?: Scalars['String'] | null;
  readonly counted?: Scalars['Boolean'] | null;
};

export type PbisCardsUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: PbisCardUpdateInput | null;
};

export type PbisCardCreateInput = {
  readonly cardMessage?: Scalars['String'] | null;
  readonly student?: UserRelateToOneInput | null;
  readonly teacher?: UserRelateToOneInput | null;
  readonly dateGiven?: Scalars['String'] | null;
  readonly counted?: Scalars['Boolean'] | null;
};

export type PbisCardsCreateInput = {
  readonly data?: PbisCardCreateInput | null;
};

export type PbisTeamWhereInput = {
  readonly AND?: ReadonlyArray<PbisTeamWhereInput | null> | null;
  readonly OR?: ReadonlyArray<PbisTeamWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly teamName?: Scalars['String'] | null;
  readonly teamName_not?: Scalars['String'] | null;
  readonly teamName_contains?: Scalars['String'] | null;
  readonly teamName_not_contains?: Scalars['String'] | null;
  readonly teamName_starts_with?: Scalars['String'] | null;
  readonly teamName_not_starts_with?: Scalars['String'] | null;
  readonly teamName_ends_with?: Scalars['String'] | null;
  readonly teamName_not_ends_with?: Scalars['String'] | null;
  readonly teamName_i?: Scalars['String'] | null;
  readonly teamName_not_i?: Scalars['String'] | null;
  readonly teamName_contains_i?: Scalars['String'] | null;
  readonly teamName_not_contains_i?: Scalars['String'] | null;
  readonly teamName_starts_with_i?: Scalars['String'] | null;
  readonly teamName_not_starts_with_i?: Scalars['String'] | null;
  readonly teamName_ends_with_i?: Scalars['String'] | null;
  readonly teamName_not_ends_with_i?: Scalars['String'] | null;
  readonly teamName_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly teamName_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly taTeacher_every?: UserWhereInput | null;
  readonly taTeacher_some?: UserWhereInput | null;
  readonly taTeacher_none?: UserWhereInput | null;
  readonly uncountedCards?: Scalars['Int'] | null;
  readonly uncountedCards_not?: Scalars['Int'] | null;
  readonly uncountedCards_lt?: Scalars['Int'] | null;
  readonly uncountedCards_lte?: Scalars['Int'] | null;
  readonly uncountedCards_gt?: Scalars['Int'] | null;
  readonly uncountedCards_gte?: Scalars['Int'] | null;
  readonly uncountedCards_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly uncountedCards_not_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly countedCards?: Scalars['Int'] | null;
  readonly countedCards_not?: Scalars['Int'] | null;
  readonly countedCards_lt?: Scalars['Int'] | null;
  readonly countedCards_lte?: Scalars['Int'] | null;
  readonly countedCards_gt?: Scalars['Int'] | null;
  readonly countedCards_gte?: Scalars['Int'] | null;
  readonly countedCards_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly countedCards_not_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly currentLevel?: Scalars['Int'] | null;
  readonly currentLevel_not?: Scalars['Int'] | null;
  readonly currentLevel_lt?: Scalars['Int'] | null;
  readonly currentLevel_lte?: Scalars['Int'] | null;
  readonly currentLevel_gt?: Scalars['Int'] | null;
  readonly currentLevel_gte?: Scalars['Int'] | null;
  readonly currentLevel_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly currentLevel_not_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly numberOfStudents?: Scalars['Int'] | null;
  readonly numberOfStudents_not?: Scalars['Int'] | null;
  readonly numberOfStudents_lt?: Scalars['Int'] | null;
  readonly numberOfStudents_lte?: Scalars['Int'] | null;
  readonly numberOfStudents_gt?: Scalars['Int'] | null;
  readonly numberOfStudents_gte?: Scalars['Int'] | null;
  readonly numberOfStudents_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly numberOfStudents_not_in?: ReadonlyArray<
    Scalars['Int'] | null
  > | null;
  readonly averageCardsPerStudent?: Scalars['Int'] | null;
  readonly averageCardsPerStudent_not?: Scalars['Int'] | null;
  readonly averageCardsPerStudent_lt?: Scalars['Int'] | null;
  readonly averageCardsPerStudent_lte?: Scalars['Int'] | null;
  readonly averageCardsPerStudent_gt?: Scalars['Int'] | null;
  readonly averageCardsPerStudent_gte?: Scalars['Int'] | null;
  readonly averageCardsPerStudent_in?: ReadonlyArray<
    Scalars['Int'] | null
  > | null;
  readonly averageCardsPerStudent_not_in?: ReadonlyArray<
    Scalars['Int'] | null
  > | null;
  readonly dateModivied?: Scalars['String'] | null;
  readonly dateModivied_not?: Scalars['String'] | null;
  readonly dateModivied_lt?: Scalars['String'] | null;
  readonly dateModivied_lte?: Scalars['String'] | null;
  readonly dateModivied_gt?: Scalars['String'] | null;
  readonly dateModivied_gte?: Scalars['String'] | null;
  readonly dateModivied_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly dateModivied_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly lastModifiedBy?: UserWhereInput | null;
  readonly lastModifiedBy_is_null?: Scalars['Boolean'] | null;
};

export type PbisTeamWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortPbisTeamsBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'teamName_ASC'
  | 'teamName_DESC'
  | 'taTeacher_ASC'
  | 'taTeacher_DESC'
  | 'uncountedCards_ASC'
  | 'uncountedCards_DESC'
  | 'countedCards_ASC'
  | 'countedCards_DESC'
  | 'currentLevel_ASC'
  | 'currentLevel_DESC'
  | 'numberOfStudents_ASC'
  | 'numberOfStudents_DESC'
  | 'averageCardsPerStudent_ASC'
  | 'averageCardsPerStudent_DESC'
  | 'dateModivied_ASC'
  | 'dateModivied_DESC'
  | 'lastModifiedBy_ASC'
  | 'lastModifiedBy_DESC';

export type PbisTeamUpdateInput = {
  readonly teamName?: Scalars['String'] | null;
  readonly taTeacher?: UserRelateToManyInput | null;
  readonly uncountedCards?: Scalars['Int'] | null;
  readonly countedCards?: Scalars['Int'] | null;
  readonly currentLevel?: Scalars['Int'] | null;
  readonly numberOfStudents?: Scalars['Int'] | null;
  readonly averageCardsPerStudent?: Scalars['Int'] | null;
  readonly dateModivied?: Scalars['String'] | null;
  readonly lastModifiedBy?: UserRelateToOneInput | null;
};

export type PbisTeamsUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: PbisTeamUpdateInput | null;
};

export type PbisTeamCreateInput = {
  readonly teamName?: Scalars['String'] | null;
  readonly taTeacher?: UserRelateToManyInput | null;
  readonly uncountedCards?: Scalars['Int'] | null;
  readonly countedCards?: Scalars['Int'] | null;
  readonly currentLevel?: Scalars['Int'] | null;
  readonly numberOfStudents?: Scalars['Int'] | null;
  readonly averageCardsPerStudent?: Scalars['Int'] | null;
  readonly dateModivied?: Scalars['String'] | null;
  readonly lastModifiedBy?: UserRelateToOneInput | null;
};

export type PbisTeamsCreateInput = {
  readonly data?: PbisTeamCreateInput | null;
};

export type StudentFocusWhereInput = {
  readonly AND?: ReadonlyArray<StudentFocusWhereInput | null> | null;
  readonly OR?: ReadonlyArray<StudentFocusWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly comments?: Scalars['String'] | null;
  readonly comments_not?: Scalars['String'] | null;
  readonly comments_contains?: Scalars['String'] | null;
  readonly comments_not_contains?: Scalars['String'] | null;
  readonly comments_starts_with?: Scalars['String'] | null;
  readonly comments_not_starts_with?: Scalars['String'] | null;
  readonly comments_ends_with?: Scalars['String'] | null;
  readonly comments_not_ends_with?: Scalars['String'] | null;
  readonly comments_i?: Scalars['String'] | null;
  readonly comments_not_i?: Scalars['String'] | null;
  readonly comments_contains_i?: Scalars['String'] | null;
  readonly comments_not_contains_i?: Scalars['String'] | null;
  readonly comments_starts_with_i?: Scalars['String'] | null;
  readonly comments_not_starts_with_i?: Scalars['String'] | null;
  readonly comments_ends_with_i?: Scalars['String'] | null;
  readonly comments_not_ends_with_i?: Scalars['String'] | null;
  readonly comments_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly comments_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly category?: Scalars['String'] | null;
  readonly category_not?: Scalars['String'] | null;
  readonly category_contains?: Scalars['String'] | null;
  readonly category_not_contains?: Scalars['String'] | null;
  readonly category_starts_with?: Scalars['String'] | null;
  readonly category_not_starts_with?: Scalars['String'] | null;
  readonly category_ends_with?: Scalars['String'] | null;
  readonly category_not_ends_with?: Scalars['String'] | null;
  readonly category_i?: Scalars['String'] | null;
  readonly category_not_i?: Scalars['String'] | null;
  readonly category_contains_i?: Scalars['String'] | null;
  readonly category_not_contains_i?: Scalars['String'] | null;
  readonly category_starts_with_i?: Scalars['String'] | null;
  readonly category_not_starts_with_i?: Scalars['String'] | null;
  readonly category_ends_with_i?: Scalars['String'] | null;
  readonly category_not_ends_with_i?: Scalars['String'] | null;
  readonly category_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly category_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly student?: UserWhereInput | null;
  readonly student_is_null?: Scalars['Boolean'] | null;
  readonly teacher?: UserWhereInput | null;
  readonly teacher_is_null?: Scalars['Boolean'] | null;
  readonly dateCreated?: Scalars['String'] | null;
  readonly dateCreated_not?: Scalars['String'] | null;
  readonly dateCreated_lt?: Scalars['String'] | null;
  readonly dateCreated_lte?: Scalars['String'] | null;
  readonly dateCreated_gt?: Scalars['String'] | null;
  readonly dateCreated_gte?: Scalars['String'] | null;
  readonly dateCreated_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly dateCreated_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
};

export type StudentFocusWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortStudentFociBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'comments_ASC'
  | 'comments_DESC'
  | 'category_ASC'
  | 'category_DESC'
  | 'student_ASC'
  | 'student_DESC'
  | 'teacher_ASC'
  | 'teacher_DESC'
  | 'dateCreated_ASC'
  | 'dateCreated_DESC';

export type StudentFocusUpdateInput = {
  readonly comments?: Scalars['String'] | null;
  readonly category?: Scalars['String'] | null;
  readonly student?: UserRelateToOneInput | null;
  readonly teacher?: UserRelateToOneInput | null;
  readonly dateCreated?: Scalars['String'] | null;
};

export type StudentFociUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: StudentFocusUpdateInput | null;
};

export type StudentFocusCreateInput = {
  readonly comments?: Scalars['String'] | null;
  readonly category?: Scalars['String'] | null;
  readonly student?: UserRelateToOneInput | null;
  readonly teacher?: UserRelateToOneInput | null;
  readonly dateCreated?: Scalars['String'] | null;
};

export type StudentFociCreateInput = {
  readonly data?: StudentFocusCreateInput | null;
};

export type CellPhoneViolationWhereInput = {
  readonly AND?: ReadonlyArray<CellPhoneViolationWhereInput | null> | null;
  readonly OR?: ReadonlyArray<CellPhoneViolationWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly description?: Scalars['String'] | null;
  readonly description_not?: Scalars['String'] | null;
  readonly description_contains?: Scalars['String'] | null;
  readonly description_not_contains?: Scalars['String'] | null;
  readonly description_starts_with?: Scalars['String'] | null;
  readonly description_not_starts_with?: Scalars['String'] | null;
  readonly description_ends_with?: Scalars['String'] | null;
  readonly description_not_ends_with?: Scalars['String'] | null;
  readonly description_i?: Scalars['String'] | null;
  readonly description_not_i?: Scalars['String'] | null;
  readonly description_contains_i?: Scalars['String'] | null;
  readonly description_not_contains_i?: Scalars['String'] | null;
  readonly description_starts_with_i?: Scalars['String'] | null;
  readonly description_not_starts_with_i?: Scalars['String'] | null;
  readonly description_ends_with_i?: Scalars['String'] | null;
  readonly description_not_ends_with_i?: Scalars['String'] | null;
  readonly description_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly student?: UserWhereInput | null;
  readonly student_is_null?: Scalars['Boolean'] | null;
  readonly teacher?: UserWhereInput | null;
  readonly teacher_is_null?: Scalars['Boolean'] | null;
  readonly dateGiven?: Scalars['String'] | null;
  readonly dateGiven_not?: Scalars['String'] | null;
  readonly dateGiven_lt?: Scalars['String'] | null;
  readonly dateGiven_lte?: Scalars['String'] | null;
  readonly dateGiven_gt?: Scalars['String'] | null;
  readonly dateGiven_gte?: Scalars['String'] | null;
  readonly dateGiven_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly dateGiven_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
};

export type CellPhoneViolationWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortCellPhoneViolationsBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'student_ASC'
  | 'student_DESC'
  | 'teacher_ASC'
  | 'teacher_DESC'
  | 'dateGiven_ASC'
  | 'dateGiven_DESC';

export type CellPhoneViolationUpdateInput = {
  readonly description?: Scalars['String'] | null;
  readonly student?: UserRelateToOneInput | null;
  readonly teacher?: UserRelateToOneInput | null;
  readonly dateGiven?: Scalars['String'] | null;
};

export type CellPhoneViolationsUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: CellPhoneViolationUpdateInput | null;
};

export type CellPhoneViolationCreateInput = {
  readonly description?: Scalars['String'] | null;
  readonly student?: UserRelateToOneInput | null;
  readonly teacher?: UserRelateToOneInput | null;
  readonly dateGiven?: Scalars['String'] | null;
};

export type CellPhoneViolationsCreateInput = {
  readonly data?: CellPhoneViolationCreateInput | null;
};

export type CallbackWhereInput = {
  readonly AND?: ReadonlyArray<CallbackWhereInput | null> | null;
  readonly OR?: ReadonlyArray<CallbackWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly title?: Scalars['String'] | null;
  readonly title_not?: Scalars['String'] | null;
  readonly title_contains?: Scalars['String'] | null;
  readonly title_not_contains?: Scalars['String'] | null;
  readonly title_starts_with?: Scalars['String'] | null;
  readonly title_not_starts_with?: Scalars['String'] | null;
  readonly title_ends_with?: Scalars['String'] | null;
  readonly title_not_ends_with?: Scalars['String'] | null;
  readonly title_i?: Scalars['String'] | null;
  readonly title_not_i?: Scalars['String'] | null;
  readonly title_contains_i?: Scalars['String'] | null;
  readonly title_not_contains_i?: Scalars['String'] | null;
  readonly title_starts_with_i?: Scalars['String'] | null;
  readonly title_not_starts_with_i?: Scalars['String'] | null;
  readonly title_ends_with_i?: Scalars['String'] | null;
  readonly title_not_ends_with_i?: Scalars['String'] | null;
  readonly title_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly title_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description?: Scalars['String'] | null;
  readonly description_not?: Scalars['String'] | null;
  readonly description_contains?: Scalars['String'] | null;
  readonly description_not_contains?: Scalars['String'] | null;
  readonly description_starts_with?: Scalars['String'] | null;
  readonly description_not_starts_with?: Scalars['String'] | null;
  readonly description_ends_with?: Scalars['String'] | null;
  readonly description_not_ends_with?: Scalars['String'] | null;
  readonly description_i?: Scalars['String'] | null;
  readonly description_not_i?: Scalars['String'] | null;
  readonly description_contains_i?: Scalars['String'] | null;
  readonly description_not_contains_i?: Scalars['String'] | null;
  readonly description_starts_with_i?: Scalars['String'] | null;
  readonly description_not_starts_with_i?: Scalars['String'] | null;
  readonly description_ends_with_i?: Scalars['String'] | null;
  readonly description_not_ends_with_i?: Scalars['String'] | null;
  readonly description_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly student?: UserWhereInput | null;
  readonly student_is_null?: Scalars['Boolean'] | null;
  readonly teacher?: UserWhereInput | null;
  readonly teacher_is_null?: Scalars['Boolean'] | null;
  readonly dateAssigned?: Scalars['String'] | null;
  readonly dateAssigned_not?: Scalars['String'] | null;
  readonly dateAssigned_lt?: Scalars['String'] | null;
  readonly dateAssigned_lte?: Scalars['String'] | null;
  readonly dateAssigned_gt?: Scalars['String'] | null;
  readonly dateAssigned_gte?: Scalars['String'] | null;
  readonly dateAssigned_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly dateAssigned_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly dateCompleted?: Scalars['String'] | null;
  readonly dateCompleted_not?: Scalars['String'] | null;
  readonly dateCompleted_lt?: Scalars['String'] | null;
  readonly dateCompleted_lte?: Scalars['String'] | null;
  readonly dateCompleted_gt?: Scalars['String'] | null;
  readonly dateCompleted_gte?: Scalars['String'] | null;
  readonly dateCompleted_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly dateCompleted_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly link?: Scalars['String'] | null;
  readonly link_not?: Scalars['String'] | null;
  readonly link_contains?: Scalars['String'] | null;
  readonly link_not_contains?: Scalars['String'] | null;
  readonly link_starts_with?: Scalars['String'] | null;
  readonly link_not_starts_with?: Scalars['String'] | null;
  readonly link_ends_with?: Scalars['String'] | null;
  readonly link_not_ends_with?: Scalars['String'] | null;
  readonly link_i?: Scalars['String'] | null;
  readonly link_not_i?: Scalars['String'] | null;
  readonly link_contains_i?: Scalars['String'] | null;
  readonly link_not_contains_i?: Scalars['String'] | null;
  readonly link_starts_with_i?: Scalars['String'] | null;
  readonly link_not_starts_with_i?: Scalars['String'] | null;
  readonly link_ends_with_i?: Scalars['String'] | null;
  readonly link_not_ends_with_i?: Scalars['String'] | null;
  readonly link_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly link_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly messageFromTeacher?: Scalars['String'] | null;
  readonly messageFromTeacher_not?: Scalars['String'] | null;
  readonly messageFromTeacher_contains?: Scalars['String'] | null;
  readonly messageFromTeacher_not_contains?: Scalars['String'] | null;
  readonly messageFromTeacher_starts_with?: Scalars['String'] | null;
  readonly messageFromTeacher_not_starts_with?: Scalars['String'] | null;
  readonly messageFromTeacher_ends_with?: Scalars['String'] | null;
  readonly messageFromTeacher_not_ends_with?: Scalars['String'] | null;
  readonly messageFromTeacher_i?: Scalars['String'] | null;
  readonly messageFromTeacher_not_i?: Scalars['String'] | null;
  readonly messageFromTeacher_contains_i?: Scalars['String'] | null;
  readonly messageFromTeacher_not_contains_i?: Scalars['String'] | null;
  readonly messageFromTeacher_starts_with_i?: Scalars['String'] | null;
  readonly messageFromTeacher_not_starts_with_i?: Scalars['String'] | null;
  readonly messageFromTeacher_ends_with_i?: Scalars['String'] | null;
  readonly messageFromTeacher_not_ends_with_i?: Scalars['String'] | null;
  readonly messageFromTeacher_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly messageFromTeacher_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly messageFromStudent?: Scalars['String'] | null;
  readonly messageFromStudent_not?: Scalars['String'] | null;
  readonly messageFromStudent_contains?: Scalars['String'] | null;
  readonly messageFromStudent_not_contains?: Scalars['String'] | null;
  readonly messageFromStudent_starts_with?: Scalars['String'] | null;
  readonly messageFromStudent_not_starts_with?: Scalars['String'] | null;
  readonly messageFromStudent_ends_with?: Scalars['String'] | null;
  readonly messageFromStudent_not_ends_with?: Scalars['String'] | null;
  readonly messageFromStudent_i?: Scalars['String'] | null;
  readonly messageFromStudent_not_i?: Scalars['String'] | null;
  readonly messageFromStudent_contains_i?: Scalars['String'] | null;
  readonly messageFromStudent_not_contains_i?: Scalars['String'] | null;
  readonly messageFromStudent_starts_with_i?: Scalars['String'] | null;
  readonly messageFromStudent_not_starts_with_i?: Scalars['String'] | null;
  readonly messageFromStudent_ends_with_i?: Scalars['String'] | null;
  readonly messageFromStudent_not_ends_with_i?: Scalars['String'] | null;
  readonly messageFromStudent_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly messageFromStudent_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
};

export type CallbackWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortCallbacksBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'student_ASC'
  | 'student_DESC'
  | 'teacher_ASC'
  | 'teacher_DESC'
  | 'dateAssigned_ASC'
  | 'dateAssigned_DESC'
  | 'dateCompleted_ASC'
  | 'dateCompleted_DESC'
  | 'link_ASC'
  | 'link_DESC'
  | 'messageFromTeacher_ASC'
  | 'messageFromTeacher_DESC'
  | 'messageFromStudent_ASC'
  | 'messageFromStudent_DESC';

export type CallbackUpdateInput = {
  readonly title?: Scalars['String'] | null;
  readonly description?: Scalars['String'] | null;
  readonly student?: UserRelateToOneInput | null;
  readonly teacher?: UserRelateToOneInput | null;
  readonly dateAssigned?: Scalars['String'] | null;
  readonly dateCompleted?: Scalars['String'] | null;
  readonly link?: Scalars['String'] | null;
  readonly messageFromTeacher?: Scalars['String'] | null;
  readonly messageFromStudent?: Scalars['String'] | null;
};

export type CallbacksUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: CallbackUpdateInput | null;
};

export type CallbackCreateInput = {
  readonly title?: Scalars['String'] | null;
  readonly description?: Scalars['String'] | null;
  readonly student?: UserRelateToOneInput | null;
  readonly teacher?: UserRelateToOneInput | null;
  readonly dateAssigned?: Scalars['String'] | null;
  readonly dateCompleted?: Scalars['String'] | null;
  readonly link?: Scalars['String'] | null;
  readonly messageFromTeacher?: Scalars['String'] | null;
  readonly messageFromStudent?: Scalars['String'] | null;
};

export type CallbacksCreateInput = {
  readonly data?: CallbackCreateInput | null;
};

export type _ksListsMetaInput = {
  readonly key?: Scalars['String'] | null;
  readonly auxiliary?: Scalars['Boolean'] | null;
};

export type _ListSchemaFieldsInput = {
  readonly type?: Scalars['String'] | null;
};

export type PasswordAuthErrorCode =
  | 'FAILURE'
  | 'IDENTITY_NOT_FOUND'
  | 'SECRET_NOT_SET'
  | 'MULTIPLE_IDENTITY_MATCHES'
  | 'SECRET_MISMATCH';

export type CreateInitialUserInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
};

export type KeystoneAdminUIFieldMetaCreateViewFieldMode = 'edit' | 'hidden';

export type KeystoneAdminUIFieldMetaListViewFieldMode = 'read' | 'hidden';

export type KeystoneAdminUIFieldMetaItemViewFieldMode =
  | 'edit'
  | 'read'
  | 'hidden';

export type KeystoneAdminUISortDirection = 'ASC' | 'DESC';

export type UserListTypeInfo = {
  key: 'User';
  fields:
    | 'id'
    | 'name'
    | 'email'
    | 'password'
    | 'taStudents'
    | 'taTeacher'
    | 'parent'
    | 'children'
    | 'role'
    | 'block1Teacher'
    | 'block1Students'
    | 'block2Teacher'
    | 'block2Students'
    | 'block3Teacher'
    | 'block3Students'
    | 'block4Teacher'
    | 'block4Students'
    | 'block5Teacher'
    | 'block5Students'
    | 'taTeam'
    | 'studentFocusTeacher'
    | 'studentFocusStudent'
    | 'studentCellPhoneViolation'
    | 'teacherCellPhoneViolation'
    | 'teacherPbisCards'
    | 'studentPbisCards'
    | 'callbackItems'
    | 'callbackAssigned'
    | 'callbackCount'
    | 'PbisCardCount'
    | 'YearPbisCount'
    | 'teacherSubject'
    | 'taPbisCardCount'
    | 'averageTimeToCompleteCallback'
    | 'block1Assignment'
    | 'block1AssignmentLastUpdated'
    | 'block2Assignment'
    | 'block3Assignment'
    | 'block4Assignment'
    | 'block5Assignment'
    | 'passwordResetToken'
    | 'passwordResetIssuedAt'
    | 'passwordResetRedeemedAt'
    | 'magicAuthToken'
    | 'magicAuthIssuedAt'
    | 'magicAuthRedeemedAt';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly email?: string | null;
    readonly password?: string | null;
    readonly taStudents?: string | null;
    readonly taTeacher?: string | null;
    readonly parent?: string | null;
    readonly children?: string | null;
    readonly role?: string | null;
    readonly block1Teacher?: string | null;
    readonly block1Students?: string | null;
    readonly block2Teacher?: string | null;
    readonly block2Students?: string | null;
    readonly block3Teacher?: string | null;
    readonly block3Students?: string | null;
    readonly block4Teacher?: string | null;
    readonly block4Students?: string | null;
    readonly block5Teacher?: string | null;
    readonly block5Students?: string | null;
    readonly taTeam?: string | null;
    readonly studentFocusTeacher?: string | null;
    readonly studentFocusStudent?: string | null;
    readonly studentCellPhoneViolation?: string | null;
    readonly teacherCellPhoneViolation?: string | null;
    readonly teacherPbisCards?: string | null;
    readonly studentPbisCards?: string | null;
    readonly callbackItems?: string | null;
    readonly callbackAssigned?: string | null;
    readonly callbackCount?: number | null;
    readonly PbisCardCount?: number | null;
    readonly YearPbisCount?: number | null;
    readonly teacherSubject?: string | null;
    readonly taPbisCardCount?: number | null;
    readonly averageTimeToCompleteCallback?: number | null;
    readonly block1Assignment?: string | null;
    readonly block1AssignmentLastUpdated?: Date | null;
    readonly block2Assignment?: string | null;
    readonly block3Assignment?: string | null;
    readonly block4Assignment?: string | null;
    readonly block5Assignment?: string | null;
    readonly passwordResetToken?: string | null;
    readonly passwordResetIssuedAt?: Date | null;
    readonly passwordResetRedeemedAt?: Date | null;
    readonly magicAuthToken?: string | null;
    readonly magicAuthIssuedAt?: Date | null;
    readonly magicAuthRedeemedAt?: Date | null;
  };
  inputs: {
    where: UserWhereInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: UserWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortUsersBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type UserListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    UserListTypeInfo,
    UserListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  UserListTypeInfo,
  UserListTypeInfo['fields']
>;

export type CalendarListTypeInfo = {
  key: 'Calendar';
  fields:
    | 'id'
    | 'name'
    | 'description'
    | 'status'
    | 'date'
    | 'author'
    | 'dateCreated'
    | 'link'
    | 'linkTitle';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly description?: string | null;
    readonly status?: string | null;
    readonly date?: Date | null;
    readonly author?: string | null;
    readonly dateCreated?: Date | null;
    readonly link?: string | null;
    readonly linkTitle?: string | null;
  };
  inputs: {
    where: CalendarWhereInput;
    create: CalendarCreateInput;
    update: CalendarUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: CalendarWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortCalendarsBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type CalendarListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    CalendarListTypeInfo,
    CalendarListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  CalendarListTypeInfo,
  CalendarListTypeInfo['fields']
>;

export type RoleListTypeInfo = {
  key: 'Role';
  fields:
    | 'id'
    | 'name'
    | 'canManageCalendar'
    | 'canSeeOtherUsers'
    | 'canManageUsers'
    | 'canManageRoles'
    | 'canManageLinks'
    | 'canManageDiscipline'
    | 'canSeeAllDiscipline'
    | 'canSeeAllTeacherEvents'
    | 'canSeeStudentEvents'
    | 'canSeeOwnCallback'
    | 'canSeeAllCallback'
    | 'hasTA'
    | 'hasClasses'
    | 'assignedTo';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly canManageCalendar?: boolean | null;
    readonly canSeeOtherUsers?: boolean | null;
    readonly canManageUsers?: boolean | null;
    readonly canManageRoles?: boolean | null;
    readonly canManageLinks?: boolean | null;
    readonly canManageDiscipline?: boolean | null;
    readonly canSeeAllDiscipline?: boolean | null;
    readonly canSeeAllTeacherEvents?: boolean | null;
    readonly canSeeStudentEvents?: boolean | null;
    readonly canSeeOwnCallback?: boolean | null;
    readonly canSeeAllCallback?: boolean | null;
    readonly hasTA?: boolean | null;
    readonly hasClasses?: boolean | null;
    readonly assignedTo?: string | null;
  };
  inputs: {
    where: RoleWhereInput;
    create: RoleCreateInput;
    update: RoleUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: RoleWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortRolesBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type RoleListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    RoleListTypeInfo,
    RoleListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  RoleListTypeInfo,
  RoleListTypeInfo['fields']
>;

export type LinkListTypeInfo = {
  key: 'Link';
  fields:
    | 'id'
    | 'name'
    | 'description'
    | 'forTeachers'
    | 'forStudents'
    | 'forParents'
    | 'onHomePage'
    | 'modifiedBy'
    | 'modified'
    | 'link';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly description?: string | null;
    readonly forTeachers?: boolean | null;
    readonly forStudents?: boolean | null;
    readonly forParents?: boolean | null;
    readonly onHomePage?: boolean | null;
    readonly modifiedBy?: string | null;
    readonly modified?: Date | null;
    readonly link?: string | null;
  };
  inputs: {
    where: LinkWhereInput;
    create: LinkCreateInput;
    update: LinkUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: LinkWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortLinksBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type LinkListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    LinkListTypeInfo,
    LinkListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  LinkListTypeInfo,
  LinkListTypeInfo['fields']
>;

export type PbisCardListTypeInfo = {
  key: 'PbisCard';
  fields:
    | 'id'
    | 'cardMessage'
    | 'student'
    | 'teacher'
    | 'dateGiven'
    | 'counted';
  backing: {
    readonly id: string;
    readonly cardMessage?: string | null;
    readonly student?: string | null;
    readonly teacher?: string | null;
    readonly dateGiven?: Date | null;
    readonly counted?: boolean | null;
  };
  inputs: {
    where: PbisCardWhereInput;
    create: PbisCardCreateInput;
    update: PbisCardUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: PbisCardWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortPbisCardsBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type PbisCardListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    PbisCardListTypeInfo,
    PbisCardListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  PbisCardListTypeInfo,
  PbisCardListTypeInfo['fields']
>;

export type PbisTeamListTypeInfo = {
  key: 'PbisTeam';
  fields:
    | 'id'
    | 'teamName'
    | 'taTeacher'
    | 'uncountedCards'
    | 'countedCards'
    | 'currentLevel'
    | 'numberOfStudents'
    | 'averageCardsPerStudent'
    | 'dateModivied'
    | 'lastModifiedBy';
  backing: {
    readonly id: string;
    readonly teamName?: string | null;
    readonly taTeacher?: string | null;
    readonly uncountedCards?: number | null;
    readonly countedCards?: number | null;
    readonly currentLevel?: number | null;
    readonly numberOfStudents?: number | null;
    readonly averageCardsPerStudent?: number | null;
    readonly dateModivied?: Date | null;
    readonly lastModifiedBy?: string | null;
  };
  inputs: {
    where: PbisTeamWhereInput;
    create: PbisTeamCreateInput;
    update: PbisTeamUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: PbisTeamWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortPbisTeamsBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type PbisTeamListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    PbisTeamListTypeInfo,
    PbisTeamListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  PbisTeamListTypeInfo,
  PbisTeamListTypeInfo['fields']
>;

export type StudentFocusListTypeInfo = {
  key: 'StudentFocus';
  fields:
    | 'id'
    | 'comments'
    | 'category'
    | 'student'
    | 'teacher'
    | 'dateCreated';
  backing: {
    readonly id: string;
    readonly comments?: string | null;
    readonly category?: string | null;
    readonly student?: string | null;
    readonly teacher?: string | null;
    readonly dateCreated?: Date | null;
  };
  inputs: {
    where: StudentFocusWhereInput;
    create: StudentFocusCreateInput;
    update: StudentFocusUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: StudentFocusWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortStudentFociBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type StudentFocusListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    StudentFocusListTypeInfo,
    StudentFocusListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  StudentFocusListTypeInfo,
  StudentFocusListTypeInfo['fields']
>;

export type CellPhoneViolationListTypeInfo = {
  key: 'CellPhoneViolation';
  fields: 'id' | 'description' | 'student' | 'teacher' | 'dateGiven';
  backing: {
    readonly id: string;
    readonly description?: string | null;
    readonly student?: string | null;
    readonly teacher?: string | null;
    readonly dateGiven?: Date | null;
  };
  inputs: {
    where: CellPhoneViolationWhereInput;
    create: CellPhoneViolationCreateInput;
    update: CellPhoneViolationUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: CellPhoneViolationWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortCellPhoneViolationsBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type CellPhoneViolationListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    CellPhoneViolationListTypeInfo,
    CellPhoneViolationListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  CellPhoneViolationListTypeInfo,
  CellPhoneViolationListTypeInfo['fields']
>;

export type CallbackListTypeInfo = {
  key: 'Callback';
  fields:
    | 'id'
    | 'title'
    | 'description'
    | 'student'
    | 'teacher'
    | 'dateAssigned'
    | 'dateCompleted'
    | 'link'
    | 'messageFromTeacher'
    | 'messageFromStudent';
  backing: {
    readonly id: string;
    readonly title?: string | null;
    readonly description?: string | null;
    readonly student?: string | null;
    readonly teacher?: string | null;
    readonly dateAssigned?: Date | null;
    readonly dateCompleted?: Date | null;
    readonly link?: string | null;
    readonly messageFromTeacher?: string | null;
    readonly messageFromStudent?: string | null;
  };
  inputs: {
    where: CallbackWhereInput;
    create: CallbackCreateInput;
    update: CallbackUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: CallbackWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortCallbacksBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type CallbackListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    CallbackListTypeInfo,
    CallbackListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  CallbackListTypeInfo,
  CallbackListTypeInfo['fields']
>;

export type KeystoneListsTypeInfo = {
  readonly User: UserListTypeInfo;
  readonly Calendar: CalendarListTypeInfo;
  readonly Role: RoleListTypeInfo;
  readonly Link: LinkListTypeInfo;
  readonly PbisCard: PbisCardListTypeInfo;
  readonly PbisTeam: PbisTeamListTypeInfo;
  readonly StudentFocus: StudentFocusListTypeInfo;
  readonly CellPhoneViolation: CellPhoneViolationListTypeInfo;
  readonly Callback: CallbackListTypeInfo;
};
