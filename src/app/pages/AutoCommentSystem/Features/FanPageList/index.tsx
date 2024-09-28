import { Button, Card, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import Helmet from '../../../../components/Helmet'
import HeaderContent from '../../../../components/Layouts/HeaderContent'
import { ContentWrapper } from '../../../../components/ContentWrapper'
import FanPageTable from '../../components/FanPageTable'
import { fanPages } from '../../../../resources/fanpage'

const FanPageList = () => {


  return (
    <ContentWrapper>
      <Helmet title="รายการแฟนเพจ" />
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <HeaderContent
            goBack
            title="รายการแฟนเพจ"
            descriptions="รายการแฟนเพจ"
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => null}
          >
            เพิ่มแฟนเพจ
          </Button>
        </Grid>
      </Grid>
      <Card
        sx={{
          padding: 2,
        }}
      >
        <FanPageTable
          isLoading={false}
          data={fanPages}
          onUpdateCategorySuccess={() => null}
        />
      </Card>
    </ContentWrapper>
  )
}

export default FanPageList
