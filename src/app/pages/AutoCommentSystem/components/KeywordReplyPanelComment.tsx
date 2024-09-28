import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { FaPlus, FaFileAlt } from 'react-icons/fa';

const KeywordReplyPanel: React.FC = () => {
  const isEmpty = true; // Condition to check if there are any replies

  return (
      <Card sx={{minHeight: 720,width:"100%" }}>
        <CardContent>
          {/* Panel Header */}
          <Typography variant="h4" gutterBottom>
            คำตอบตาม keyword
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            (เลือกคำตอบตาม keyword คำถามที่คุณต้องการ)
          </Typography>

          {/* Add Reply Button */}
          <Box textAlign="center" my={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<FaPlus />}
              onClick={() => console.log('Add new reply')}
            >
              เพิ่มคำตอบใหม่
            </Button>
          </Box>

          {/* Conditional Rendering for Empty List */}
          {isEmpty ? (
            <Box textAlign="center" mt={5}>
              <Typography
                variant="h6"
                color="textSecondary"
                sx={{ fontSize: '30px', marginBottom: '20px' }}
              >
                ยังไม่มีรายการ
              </Typography>
              <FaFileAlt style={{ fontSize: '170px', color: '#CCC' }} />
            </Box>
          ) : (
            <div>
              {/* Here you can load the list of replies if available */}
            </div>
          )}
        </CardContent>
      </Card>
  );
};

export default KeywordReplyPanel;
