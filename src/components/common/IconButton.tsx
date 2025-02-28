import { SvgIconComponent } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import Typography from '@mui/material/Typography';

interface IconButtonProps extends ButtonProps {
  label: string;
  icon: SvgIconComponent;
  onClick: () => void;
  selected?: boolean;
}

const IconButton = ({
  label,
  icon: Icon,
  onClick,
  selected = false,
  ...buttonProps
}: IconButtonProps) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        backgroundColor: selected ? '#D6E6FD' : 'transparent',
        color: selected ? 'primary' : '#A9A9A9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'none',
        padding: 1,
        borderRadius: 2,
        '&:hover': {
          backgroundColor: selected ? '#B0D4FB' : '#F0F0F0',
        },
        maxWidth: '97px',
      }}
      {...buttonProps}
    >
      <Icon fontSize="large" />
      <Typography
        variant="body2"
        sx={{
          fontWeight: 'bold',
          marginTop: 1,
          color: selected ? 'primary' : '#A9A9A9',
        }}
      >
        {label}
      </Typography>
    </Button>
  );
};
export default IconButton;
