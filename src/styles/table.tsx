import { Table } from 'antd'
import styled from 'styled-components'

export const TableWrapperStyle = styled(Table)`
  .ant-table-tbody > tr > td > .ant-table-wrapper:only-child .ant-table {
    margin: -16px -16px -16px -17px;
    background: rgba(247, 250, 255, 0.43);
  }

  .ant-table-tbody > tr > td,
  .ant-table.ant-table-small .ant-table-thead > tr > th {
    height: 34px;
    padding: 0.5em 1em;
  }

  tr.ant-table-expanded-row > td,
  tr.ant-table-expanded-row:hover > td {
    padding: 0 !important;
  }
`

export const SummaryWrapper = styled.div<{
  align?: string | undefined
}>`
  display: flex;
  justify-content: ${(p) => p.align || 'flex-end'};
`
