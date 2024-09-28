import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    Checkbox,
    Tabs,
    Tab,
    TextField,
    Button,
    Typography,
    FormGroup,
} from '@mui/material';
import { FaComments, FaTimes, FaThumbsUp, FaEyeSlash, FaCheck } from 'react-icons/fa';
import {
    ThumbUp, ThumbUpOutlined, VisibilityOff, VisibilityOffOutlined,
    Favorite,
    MarkunreadOutlined,
    Markunread,
    WarningAmberOutlined,
    WarningAmber,
    FavoriteBorder,

} from '@mui/icons-material';


// Helper components for dynamic tabs
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

const SettingReplyComment: React.FC = () => {
    const [radioValue, setRadioValue] = useState('0');
    const [tabValue, setTabValue] = useState(0);
    const [replyCommentDefault, setReplyCommentDefault] = useState('');
    const [replyMessageDefault, setReplyMessageDefault] = useState('');
    const [isLike, setIsLike] = useState(false);
    const [isHide, setIsHide] = useState(false);
    const [state, setState] = React.useState({
        replyNotChildren: false,
        replyNotTag: false,
        replyNotWord: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue((event.target as HTMLInputElement).value);
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Card sx={{ minHeight: 720, width: "100%" }}>
            <CardContent>
                <Typography variant="h4">คำตอบมาตรฐาน</Typography>
                <Typography variant="subtitle1" gutterBottom>
                    (ระบบจะใช้ข้อมูลนี้หากไม่พบคำหรือ keyword ที่ตั้งไว้ในคำตอบตาม keyword)
                </Typography>

                <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" sx={{ textAlign: 'center' }}>
                        เลือกโพส
                    </FormLabel>
                    <RadioGroup
                        row
                        value={radioValue}
                        onChange={handleRadioChange}
                        sx={{ justifyContent: 'center' }}
                    >
                        <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="ทุกโพสในแฟนเพจ"
                        />
                        <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="เลือกเฉพาะบางโพส"
                        />
                    </RadioGroup>
                </FormControl>
                {radioValue === '1' && (
                    <TextField
                        label="ใส่ ID โพส หรือ คำที่ตรงกับแคปชันของโพส"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                )}
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.replyNotChildren}
                                    onChange={handleChange}
                                    name="replyNotChildren"
                                    icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />}
                                />
                            }
                            label="ไม่ตอบคอมเม้นลูก"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.replyNotTag}
                                    onChange={handleChange}
                                    name="replyNotTag"
                                    icon={<MarkunreadOutlined />}
                                    checkedIcon={<Markunread />}
                                />
                            }
                            label="ไม่ตอบถ้า TAG เพื่อน"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.replyNotWord}
                                    onChange={handleChange}
                                    name="replyNotWord"
                                    icon={<WarningAmberOutlined />}
                                    checkedIcon={<WarningAmber />}
                                />
                            }
                            label="ไม่ตอบถ้ามีคำเหล่านี้"
                        />
                    </FormGroup>
                </FormControl>

                <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label={<span><img src="https://apppost.net/comment.png" alt="comment" width="20px" /> ข้อความคอมเม้นตอบกลับ</span>} />
                    <Tab label={<span><img src="https://apppost.net/message.png" alt="inbox" width="20px" /> ข้อความ Inbox</span>} />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                    <TextField
                        label="ข้อความคอมเม้นตอบกลับ"
                        multiline
                        rows={5}
                        fullWidth
                        value={replyCommentDefault}
                        onChange={(e) => setReplyCommentDefault(e.target.value)}
                        placeholder="(เว้นว่างไว้ถ้าไม่ต้องการใช้คำตอบมาตรฐาน)"
                    />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <TextField
                        label="ข้อความ Inbox"
                        multiline
                        rows={5}
                        fullWidth
                        value={replyMessageDefault}
                        onChange={(e) => setReplyMessageDefault(e.target.value)}
                        placeholder="(เว้นว่างไว้ถ้าไม่ต้องการใช้คำตอบมาตรฐาน)"
                    />
                </TabPanel>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 2 }}
                    fullWidth
                    onClick={() => console.log('Submit Form')}
                >
                    <FaCheck /> บันทึกข้อมูล
                </Button>
                <Box mt={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isLike}
                                onChange={() => setIsLike(!isLike)}
                                icon={<ThumbUpOutlined />}
                                checkedIcon={<ThumbUp />}
                            />
                        }
                        label="กดไลค์ที่ข้อความของผู้คอมเม้น"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isHide}
                                onChange={() => setIsHide(!isHide)}
                                icon={<VisibilityOffOutlined />}
                                checkedIcon={<VisibilityOff />}
                            />
                        }
                        label="ซ่อนข้อความของผู้คอมเม้น"
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default SettingReplyComment;
