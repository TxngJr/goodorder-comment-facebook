import React from 'react'
import { Autocomplete, Box, TextField } from '@mui/material'

interface Props<T> {
  resetAutoComplete?: string
  label: string
  onSelect: (value: IOptionSelect<T> | null) => void
  search: string
  onSearch: (value: string) => void
  options: IOptionSelect<T>[] | any
  defaultValue?: IOptionSelect<T>
  name?: string
  helperText?: string | any
  error?: boolean | any
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export interface IOptionSelect<T> {
  label: string
  image?: string
  value: T
}

const SelectSearch = <T extends unknown>(props: Props<T>) => {
  const {
    resetAutoComplete = '',
    label,
    onSelect,
    search,
    onSearch,
    options,
    defaultValue,
  } = props

  return (
    <>
      <Autocomplete
        key={resetAutoComplete}
        defaultValue={defaultValue}
        autoFocus
        onChange={(event: any, data: IOptionSelect<T> | null) => {
          onSelect(data!)
        }}
        inputValue={search}
        onInputChange={(event: any, data: string) => {
          onSearch(data)
        }}
        options={options}
        renderOption={(props, option) =>
          option.image ? (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={option.image}
                alt={option.label}
              />
              {option.label}
            </Box>
          ) : (
            <Box component="li" {...props}>
              {option.label}
            </Box>
          )
        }
        renderInput={(params) => (
          <TextField
            key={params.id}
            {...params}
            label={label}
            helperText={props.helperText}
            error={props.error}
            onBlur={props.onBlur}
          />
        )}
      />
    </>
  )
}

export default SelectSearch
