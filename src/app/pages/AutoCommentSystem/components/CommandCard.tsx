// DashboardCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { IconType } from 'react-icons'; // Use this if you are using react-icons

interface DashboardCardProps {
    title: string;
    result: string;
    description: string;
    icon: IconType; // Pass in the icon component
    color: string; // Dynamic color for the card
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, result, description, icon: Icon, color }) => {
    return (
        <Card sx={{ backgroundColor: color, color: '#fff',width:"100%" }}>
            <CardContent sx={{padding:2}}>
                <Box display="flex" alignItems="center">
                    <Box mr={2}>
                        <Icon size={24} />
                    </Box>
                    <Typography variant="subtitle1" component="div">
                        {title}
                    </Typography>
                </Box>
                <Typography variant="subtitle2">{result}</Typography>
                <Typography variant="body2">{description}</Typography>
            </CardContent>
        </Card>
    );
};

export default DashboardCard;
