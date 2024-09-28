import React from 'react'
import { Box, IconButton } from '@mui/material'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'

interface Props {
  imageUrl?: string 
  name: string;
  size?: number;
  isShowCancel?: boolean;
  onCancel?: (value?: string) => void;
}

const ImgTag = ({ imageUrl, name, size = 45, isShowCancel = false, onCancel }: Props) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: isShowCancel ? size + 20 : undefined,
        height: isShowCancel ? size + 20 : undefined,
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 1,
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: 'success.main',
              color: 'white',
              fontSize: 16,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {name && name.length >= 2 ? name.substr(0, 2).toUpperCase() : 'NA'}
          </Box>
        )}
      </Box>
      {isShowCancel &&
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,

          }}
        >
          <IconButton
            sx={{
              margin: 0,
              padding: 0,
            }}
            onClick={() => onCancel && onCancel(imageUrl)}
          >
            <CancelTwoToneIcon sx={{ fontSize: 25 }} />
          </IconButton>
        </Box>
      }
    </Box>
  )
}

export default ImgTag