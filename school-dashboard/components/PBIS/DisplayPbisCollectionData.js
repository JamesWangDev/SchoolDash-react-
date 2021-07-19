import ProgressBar from '@ramonak/react-progress-bar';
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
  const percentageOfTaTeamsAtCurrentGoalLevel = Math.round(
    (teamsAtCurrentGoalLevel / taTeamsLevels.length) * 100
  );

  return (
    <div>
      <h2>Stats at last collection: {collectionData.name}</h2>
      <h3>
        {teamsAtCurrentGoalLevel} of {taTeamsLevels.length} TA's have reached
        level {currentTeamLevelGoal}
      </h3>

      <h3>
        {teamsThatWentUpLevel.length} of {taTeamsLevels.length} TA Teams and{' '}
        {studentsWhoWentUpLevel.length} students have gone up a level
        <ProgressBar
          completed={percentageOfTaTeamsAtCurrentGoalLevel}
          bgColor="var(--blue)"
        />
      </h3>
      <TeamCardStyles>
        {teamsThatWentUpLevel.map((team) => (
          <div key={team.id}>
            <h3>Team Level-Up</h3>
            <h4>{team.teamName}</h4>
            <h4>Level {team.currentLevel}</h4>
            <p>{team.averageCardsPerStudent} cards per student</p>
          </div>
        ))}
        {studentsWhoWentUpLevel.map((student) => (
          <div key={student.student}>
            <h3>Student Level-Up</h3>
            <h4>{student.name}</h4>
            <h4>Level {student.level}</h4>
          </div>
        ))}
        {taWinners.map((ta) => (
          <div key={ta.taId}>
            <h3>Random Drawing Winner</h3>
            <h4>{ta.taWinner.taName}</h4>
            <p>{ta.taWinner.studentName}</p>
          </div>
        ))}
      </TeamCardStyles>
    </div>
  );
}
