import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

const ProgressBarWithPercent = ({ value }:{value:number}) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <BorderLinearProgress variant="determinate" value={value} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressBarWithPercent;