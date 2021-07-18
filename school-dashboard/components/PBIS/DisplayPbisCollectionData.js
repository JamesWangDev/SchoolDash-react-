import { TeamCardStyles } from '../../pages/pbis';

export default function DisplayPbisCollectionData({ collectionData }) {
  const taWinners = JSON.parse(collectionData.randomDrawingWinners);
  const studentsWhoWentUpLevel = JSON.parse(
    collectionData.personalLevelWinners
  );
  const currentTeamLevelGoal = collectionData.currentPbisTeamGoal;
  const taTeamsLevels = JSON.parse(collectionData.taTeamsLevels);
  const teamsThatWentUpLevel = JSON.parse(collectionData.taTeamNewLevelWinners);
  const totalNumberOfTas = taWinners.length;
  const teamsAtCurrentGoalLevel = taTeamsLevels.reduce(
    (acc, curr) => (curr.currentLevel >= currentTeamLevelGoal ? acc + 1 : acc),
    0
  );

  return (
    <div>
      <h2>Stats at last collection: {collectionData.name}</h2>
      <h3>
        {teamsAtCurrentGoalLevel} of {totalNumberOfTas} have reached level{' '}
        {currentTeamLevelGoal}
      </h3>

      <h3>
        {teamsThatWentUpLevel.length} of {taTeamsLevels.length} TA Teams and{' '}
        {studentsWhoWentUpLevel.length} students have gone up a level
      </h3>
      <TeamCardStyles>
        {teamsThatWentUpLevel.map((team) => (
          <div key={team.teamId}>
            <h4>{team.teamName}</h4>
            <h4>Level {team.currentLevel}</h4>
            <p>{team.averageCardsPerStudent} cards per student</p>
          </div>
        ))}
        {studentsWhoWentUpLevel.map((student) => (
          <div key={student.studentId}>
            <h4>{student.name}</h4>
            <h4>Level {student.level}</h4>
          </div>
        ))}
      </TeamCardStyles>
      {/* <p>{JSON.stringify(taWinners)}</p> */}
    </div>
  );
}
