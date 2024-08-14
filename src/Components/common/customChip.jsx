import React from 'react';
import Chip from '@mui/material/Chip';
import TagFacesIcon from '@mui/icons-material/TagFaces';

const CustomChip = ({ label, icon, onDelete }) => {
  return (
    <Chip
      icon={icon}
      label={label}
      onDelete={onDelete}
    />
  );
};

export default CustomChip;
