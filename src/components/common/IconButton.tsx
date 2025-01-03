import { SvgIconComponent } from '@mui/icons-material';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

interface IconButtonProps {
  label: string;
  icon: SvgIconComponent;
}

const IconButton = ({ label, icon: Icon }: IconButtonProps) => {
  return (
    <Box
      sx={{
        borderRadius: 10,
        background: '#D6E6FD',
        display: 'flex',
        padding: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
      }}
    >
      <Icon />
      <Typography variant="body2" sx={{ color: '#555555', fontWeight: 'bold' }}>
        {label}
      </Typography>
    </Box>
  );
};
export default IconButton;
