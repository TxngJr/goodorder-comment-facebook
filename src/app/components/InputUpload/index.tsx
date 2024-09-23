import React, { ChangeEvent } from 'react'
import { Box, Button } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import ClearIcon from '@mui/icons-material/Clear'

interface Props {
  handleUploadClick: (event: ChangeEvent<HTMLInputElement>) => void
  imageUrls?: string[]
  onRemove?: (index: number) => void
  width?: string
}

const InputUpload = (props: Props) => {
  const { handleUploadClick, imageUrls, onRemove, width } = props

  return (
    <>
      <input
        data-label={`หลักฐานการชำระเงิน`}
        type="file"
        multiple
        onChange={handleUploadClick}
        className="custom-input-file"
      />
      <Box
        mt={2}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #ddd',
          borderStyle: 'dashed',
          borderRadius: '8px',
          padding: '10px'
        }}
      >
        {imageUrls && imageUrls.length > 0 ? (
          imageUrls.map((imageUrl, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '10px',
                width: '100%'
              }}
            >
              <img
                src={imageUrl}
                alt={`Uploaded ${index + 1}`}
                style={{ width: width || '100%', height: 'auto' }}
              />
              {onRemove && (
                <Box
                  sx={{
                    position: 'absolute', top: 5, right: 5, zIndex: 1, opacity: 0.5,
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                >
                  <Button
                    onClick={() => onRemove(index)}
                    color="inherit"
                    size="small"
                    variant="contained"
                    startIcon={<ClearIcon />}
                  >
                    ยกเลิก
                  </Button>
                </Box>
              )}
            </Box>
          ))
        ) : (
          <Box>
            <ImageIcon sx={{ fontSize: 72, color: '#ccc' }} />
          </Box>
        )}
      </Box>
    </>
  )
}

export default InputUpload
