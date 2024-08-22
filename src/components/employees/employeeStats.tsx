import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import CountUp from 'react-countup';

const EmployeeStats = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                marginLeft:2,
                my: 1,
                flexDirection: isSmallScreen ? 'column' : 'row',
                gap: 2.5,
            }}
        >
            {[
                { title: 'Total Employee', count: 614 },
                { title: 'New Employee', count: 124 },
                { title: 'Male', count: 504 },
                { title: 'Female', count: 100 },
            ].map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        backgroundColor: 'white',
                        padding: 2,
                        borderRadius: 3,
                        width: isSmallScreen ? '100%' : 'calc(24% - 8px)',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: 'normal', color: '#666' }}>
                        {item.title}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'normal', mt: 1 }}>
                        <CountUp end={item.count} duration={2.5} separator="," />
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default EmployeeStats;