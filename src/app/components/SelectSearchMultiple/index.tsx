import React from 'react'
import { Autocomplete, AutocompleteChangeReason, TextField } from '@mui/material'

interface Props<T> {
  resetAutoComplete?: string;
  label: string;
  placeholder?: string;
  onSelect: (value: IOptionSelect<T>[] | null) => void;
  search: string;
  onSearch: (value: string) => void;
  options: IOptionSelect<T>[] | any;
}

export interface IOptionSelect<T> {
  label: string
  value: T
}

const SelectSearchMultiple = <T extends unknown>(props: Props<T>) => {
  const { resetAutoComplete = "", label, placeholder, onSelect, search, onSearch, options } = props

  return (
    <>
      <Autocomplete
        multiple
        key={resetAutoComplete}
        options={options}
        getOptionLabel={(option) => option?.label ?? ''}
        onChange={(event: any, data: (IOptionSelect<T> | undefined)[]) => {
          onSelect(data.filter(option => option !== undefined) as IOptionSelect<T>[])
        }}
        inputValue={search}
        onInputChange={(event: any, data: string) => {
          onSearch(data)
        }}

        renderInput={(params) => <TextField key={params.id} {...params} label={label} placeholder={placeholder} />} />
    </>
  )

}

export default SelectSearchMultiple
