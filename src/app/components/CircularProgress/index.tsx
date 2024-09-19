import React from 'react'
import { Box, CircularProgress, Dialog, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const CircularLoading = () => {
  const isLoading = useSelector<RootState>((state) => state.loading.isLoading);
  return (
    <>
      <Dialog open={!!isLoading}>
        <React.Fragment>
          <Box textAlign={'center'} p={4}>
            <CircularProgress />
            <Typography sx={{ my: 2 }} variant="h6">กำลังโหลด...</Typography>
          </Box>
        </React.Fragment>
      </Dialog>
    </>
  )
}

export default CircularLoading
