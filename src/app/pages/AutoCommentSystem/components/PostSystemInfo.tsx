import React from 'react';
import { Box, Typography, Switch, FormControlLabel, Chip, Card } from '@mui/material';

const PostSystemInfo: React.FC = () => {
    const handleLiveSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Live status changed:', event.target.checked);
    };

    return (
        <Card sx={{ width: "100%",padding:2 }}>

            <Typography variant="h6" fontWeight="bold">
                <Chip label="[n_r]" color="error" sx={{ fontSize: '16px', mr: 1 }} />
                ใส่คำนี้ในแคปชันของโพส ระบบจะไม่ทำงานกับโพสนั้นๆ
            </Typography>

            <Typography variant="h6" fontWeight="bold" mt={2}>
                <Chip label="[all]" color="error" sx={{ fontSize: '16px', mr: 1 }} />
                ใส่คำนี้ในช่อง "ถ้ามีคำเหล่านี้ในคอมเม้น" ระบบจะทำงานกับทุกคอมเม้นของโพสที่เลือก
            </Typography>

            <Typography variant="h6" fontWeight="bold" mt={2}>
                <FormControlLabel
                    control={
                        <Switch color="primary" onChange={handleLiveSwitch} />
                    }
                    label="หากเปิด ระบบจะทำงานกับ Live สดด้วย"
                />
            </Typography>
        </Card>
    );
};

export default PostSystemInfo;
